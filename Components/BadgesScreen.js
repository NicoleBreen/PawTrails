import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const badges = [
  { id: 1, name: '1 Mile' },
  { id: 2, name: '5 Miles' },
  { id: 3, name: '10 Miles' },
];

const badgeImage = require('../assets/badge.png'); // Single image for all milestones

export default function BadgesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Badges</Text>
      <View style={styles.badgeContainer}>
        {badges.map((badge) => (
          <View key={badge.id} style={styles.badge}>
            <Image source={badgeImage} style={styles.badgeImage} />
            <Text style={styles.badgeName}>{badge.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ccb7a4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  badge: {
    alignItems: 'center',
    margin: 10,
  },
  badgeImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});