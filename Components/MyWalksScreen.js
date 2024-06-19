import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyWalksScreen() {
  const [walks, setWalks] = useState([]);

  useEffect(() => {
    const fetchWalks = async () => {
      try {
        const existingWalks = await AsyncStorage.getItem('walkData');
        setWalks(existingWalks ? JSON.parse(existingWalks) : []);
      } catch (error) {
        console.error('Error fetching walks:', error);
      }
    };

    fetchWalks();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Walks</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ccb7a4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  walkItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
  },
});