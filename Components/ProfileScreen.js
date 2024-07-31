import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import { ProfileContext } from './ProfileContext';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import logo from '../assets/logo_long.png';
import UploadImage from './UploadImage';

export default function ProfileScreen() {
  const { profile, setProfile } = useContext(ProfileContext);
  const navigation = useNavigation();
  const [localPhotos, setLocalPhotos] = useState(profile.photos);

  useEffect(() => {
    console.log('Profile data in ProfileScreen:', profile);
    setLocalPhotos(profile.photos); // Update local state when profile changes
  }, [profile]);

  const pickImage = async () => {
    console.log('Opening image picker...');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Image picker result:', result);
      const newPhoto = { uri: result.assets[0].uri };
      const updatedPhotos = [...localPhotos, newPhoto];
      setLocalPhotos(updatedPhotos); // Update local state
      setProfile({ ...profile, photos: updatedPhotos }); // Update context state
    }
  };

  const dogNames = Array.isArray(profile.dogNames) ? profile.dogNames : [];
  const photos = Array.isArray(profile.photos) ? profile.photos : [];

  console.log('Dog names:', dogNames);
  console.log('Photos:', photos);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <Image source={logo} style={styles.logo} />
          <View style={styles.centeredContent}>
            <Image source={profile.profileImage} style={styles.profileImage} />
            <Text style={styles.subtitle}>{profile.userName}</Text>
            {Array.isArray(dogNames) && dogNames.length > 0 ? (
              <View style={styles.dogNamesContainer}>
                {dogNames.map((dogName, index) => (
                  <Text key={index} style={styles.dogName}>{dogName}</Text>
                ))}
              </View>
            ) : (
              <Text>No dog names found</Text>
            )}
          </View>
          <View style={styles.section}>
            <Text style={styles.bioTitle}>Bio:</Text>
            <Text style={styles.bio}>{profile.bio}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.photoTitle}>Photos:</Text>
            <View style={styles.photoContainer}>
              {Array.isArray(photos) && photos.length > 0 ? (
                photos.map((photo, index) => (
                  <View key={index} style={styles.photoWrapper}>
                    <Image 
                      key={index} 
                      source={{ uri: photo.uri }} 
                      style={styles.photo} 
                    />
                  </View>
                ))
              ) : (
                <Text>No photos found</Text>
              )}
            </View>
            <View style={styles.uploadImageWrapper}>
              <Pressable style={styles.uploadButton} onPress={pickImage}>
                <Text style={styles.uploadButtonText}>Upload Image</Text>
              </Pressable>
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
  uploadButton: {
    backgroundColor: '#623b1d',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 5,
    alignItems: 'absolute',
    marginTop: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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