import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import { ProfileContext } from './ProfileContext';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/logo_long.png';
import UploadImage from './UploadImage';

export default function ProfileScreen() {
  const { profile } = useContext(ProfileContext);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Profile data: ", profile);
  }, [profile]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <Image source={logo} style={styles.logo} />
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
            <View style={styles.photoContainer}>
              {profile.photos.map((photo, index) => (
                <View key={index} style={styles.photoWrapper}>
                  <Image 
                    key={index} 
                    source={{ uri: photo.uri }} 
                    style={styles.photo} 
                  />
                  {/* <Text style={{ color: 'black' }}>Image {index + 1}</Text> */} 
                </View>
              ))}
            </View>
            <View style={styles.uploadImageWrapper}>
              <UploadImage />
            </View>
          </View>
        </View>
      </ScrollView>
      <Pressable style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccb7a4',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100, 
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 50,
    marginTop: 10,
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
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoWrapper: {
    width: '32%',
    aspectRatio: 1,
    marginBottom: 10,
    borderWidth: 2, // Add border to debug
    borderColor: 'black', // Add border color to debug
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  uploadImageWrapper: {
    marginTop: 50, // Add margin to create space between the images and the upload button
  },
  editButton: {
    backgroundColor: '#623b1d',
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 95,
    transform: [{ translateX: -50 }],
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
});