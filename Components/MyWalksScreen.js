import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/logo_long.png';

export default function MyWalksScreen() {
  const [walks, setWalks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchWalks = async () => {
      try {
        const existingWalks = await AsyncStorage.getItem('walkData');
        setWalks(existingWalks ? JSON.parse(existingWalks) : []);
      } catch (error) {
        console.error('Error fetching walks:', error);
        setError('Failed to load walks. Please try again later.');
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchWalks();
  }, []);

  /**
   * Format date into a human-readable string.
   * @param {string} dateString - The date string to format.
   * @returns {string} - The formatted date string.
   */
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  /**
   * Format time from seconds into a human-readable string.
   * @param {number} seconds - The time in seconds to format.
   * @returns {string} - The formatted time string.
   */
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} accessible={true} accessibilityLabel="App logo" />
      </View>
      <Text style={styles.title}>My Walks</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={walks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.walkItem}>
              <Text style={styles.date}>{formatDate(item.date)}</Text>
              <Text style={styles.details}>Distance: {(item.distance / 1000).toFixed(2)} km</Text>
              <Text style={styles.details}>Time: {formatTime(item.time)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ccb7a4',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  walkItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});