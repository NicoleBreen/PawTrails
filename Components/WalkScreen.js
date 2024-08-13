import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator, Pressable, Alert } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function WalkScreen() {
  const [location, setLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [distance, setDistance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isWalking, setIsWalking] = useState(false); // Track if the walk is active

  const watchId = useRef(null);
  const navigation = useNavigation();
  const maxRetryAttempts = 3;

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log('Permission status:', status); // Log the permission status
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        } else {
          initializeLocation();
        }
      } catch (error) {
        console.error('Error requesting location permissions:', error);
        setErrorMsg('Failed to request location permissions. Please try again later.');
      }
    };

    requestPermissions();
  }, []);

  /**
   * Initialise the user's location and set the initial region for the map.
   * Retry up to maxRetryAttempts if the initialization fails.
   * 
   * @param {number} attempt - The current attempt number for initializing the location.
   */
  const initializeLocation = async (attempt = 1) => {
    try {
      console.log('Initializing location...');
      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      console.log('Current location:', currentLocation);

      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setLocation({ latitude, longitude });

      const addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
      setAddress(addressResponse[0]);
      console.log('Initial address:', addressResponse[0]);
    } catch (error) {
      console.error('Error initializing location:', error);
      if (attempt < maxRetryAttempts) {
        setTimeout(() => initializeLocation(attempt + 1), 2000);
      } else {
        setErrorMsg('Failed to initialize location after multiple attempts. Please try again later.');
      }
    }
  };

  /**
   * Start tracking the user's walk, updating the location and route in real-time.
   */
  const startWalk = async () => {
    if (!initialRegion) {
      Alert.alert('Waiting', 'Still loading location. Please wait.');
      return;
    }

    console.log('Starting walk...');
    Alert.alert('Walk Started', 'Your walk has started.');
    setIsWalking(true);
    setStartTime(new Date());
    setRoute([]);
    setDistance(0);

    watchId.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      async (newLocation) => {
        const { latitude, longitude } = newLocation.coords;
        if (location) {
          const distanceIncrement = getDistance(location, { latitude, longitude });
          setDistance((prevDistance) => prevDistance + distanceIncrement);
        }

        setLocation({ latitude, longitude });
        setRoute((prevRoute) => [...prevRoute, { latitude, longitude }]);

        try {
          const addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
          setAddress(addressResponse[0]);
        } catch (error) {
          console.error('Error during reverse geocoding:', error);
        }
      }
    );
  };

  /**
   * Calculate the distance between two locations using the Haversine formula.
   * 
   * @param {object} loc1 - The first location object with latitude and longitude.
   * @param {object} loc2 - The second location object with latitude and longitude.
   * @returns {number} The distance between the two locations in meters.
   */
  const getDistance = (loc1, loc2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth radius in meters

    const lat1 = toRad(loc1.latitude);
    const lat2 = toRad(loc2.latitude);
    const deltaLat = toRad(loc2.latitude - loc1.latitude);
    const deltaLon = toRad(loc2.longitude - loc1.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  /**
   * Stop tracking the user's walk, save the walk data, and navigate to the My Walks screen.
   */
  const stopWalk = async () => {
    console.log('Stopping walk...');
    setIsLoading(true); // Start loading
    try {
      if (watchId.current) {
        watchId.current.remove();
      }
      const endTime = new Date();
      const walkTime = (endTime - startTime) / 1000; // in seconds
      const walkData = {
        distance,
        time: walkTime,
        route,
        date: endTime,
      };

      // Fetch existing walks
      const existingWalks = await AsyncStorage.getItem('walkData');
      const walks = existingWalks ? JSON.parse(existingWalks) : [];

      // Add the new walk
      walks.push(walkData);

      // Save the updated list of walks
      await AsyncStorage.setItem('walkData', JSON.stringify(walks));
      console.log('Walk data saved:', walkData);

      // Navigate to My Walks screen
      navigation.navigate('My Walks');
    } catch (error) {
      console.error('Error stopping walk:', error);
      Alert.alert('Error', 'Failed to save walk data. Please try again.', [
        { text: 'OK' }
      ]);
    } finally {
      setIsLoading(false); // End loading
      setIsWalking(false); // End walking
    }
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (address) {
    text = [
      address.name,
      address.street,
      address.city || address.subregion,
      address.region,
      address.country,
    ]
      .filter((part) => part)
      .join(', ');
  } else if (location) {
    text = `Current location: ${JSON.stringify(location)}`;
  }

  return (
    <View style={styles.container}>
      {initialRegion ? (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation
          followsUserLocation
        >
          {route.length > 1 && <Polyline coordinates={route} strokeWidth={5} strokeColor="red" />}
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      <View style={styles.textContainer}>
        <Text>{text}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.buttonRow}>
            <Pressable 
              style={styles.startButton} 
              onPress={startWalk} 
              disabled={isWalking}
              accessibilityLabel="Start Walk"
              accessibilityHint="Start tracking your walk"
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>Start Walk</Text>
            </Pressable>
            <Pressable 
              style={styles.stopButton} 
              onPress={stopWalk} 
              disabled={!isWalking}
              accessibilityLabel="Stop Walk"
              accessibilityHint="Stop tracking your walk"
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>Stop Walk</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  textContainer: {
    position: 'absolute',
    bottom: 100,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  startButton: {
    backgroundColor: '#623b1d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  stopButton: {
    backgroundColor: '#623b1d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});