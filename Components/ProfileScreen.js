import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { ProfileContext } from './ProfileContext';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/logo_long.png'; // Adjust the path as necessary

export default function ProfileScreen() {
  const { profile } = useContext(ProfileContext);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.content}>
          <View style={styles.centeredContent}>
            <Image source={profile.profileImage} style={styles.profileImage} />
            <Text style={styles.subtitle}>{profile.userName}</Text>
            {profile.dogNames.length > 0 && (
              <View style={styles.dogNamesContainer}>
                {profile.dogNames.map((dogName, index) => (
                  <Text key={index} style={styles.dogName}>{dogName}</Text>
                ))}
              </View>
            )}
          </View>
          <View style={styles.section}>
            <Text style={styles.bioTitle}>Bio:</Text>
            <Text style={styles.bio}>{profile.bio}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.photoTitle}>Photos:</Text>
            <View style={styles.photosGrid}>
              {profile.photos.map((photo, index) => (
                <Image key={index} source={photo} style={styles.photo} />
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#ccb7a4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 200, // Adjust width as per your design
    height: 50, // Adjust height as per your design
    resizeMode: 'contain',
    marginBottom: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  centeredContent: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  dogNamesContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  dogName: {
    fontSize: 20,
    marginVertical: 5,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  bio: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'left',
  },
  photoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photo: {
    width: '32%', // Adjust width as per your design
    aspectRatio: 1, // Maintain aspect ratio
    borderRadius: 10,
    marginBottom: 10,
  },
});