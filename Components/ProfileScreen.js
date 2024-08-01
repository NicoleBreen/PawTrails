import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable, Alert } from 'react-native';
import { ProfileContext } from './ProfileContext';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/logo_long.png';
import * as ImagePicker from 'expo-image-picker';

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
      Alert.alert('Image Added', 'The image has been successfully added to your profile.');
    } else {
      Alert.alert('Unable to Load Image', 'No image was selected.');
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
          <Image source={logo} style={styles.logo} accessibilityLabel="App logo" /> 
          <View style={styles.centeredContent}>
            <Image source={profile.profileImage} style={styles.profileImage} accessibilityLabel="Profile picture" />
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
                      accessibilityLabel={`Photo ${index + 1}`}
                      accessibilityHint={`Double tap to view photo ${index + 1}`}
                    />
                  </View>
                ))
              ) : (
                <Text>No photos found</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.editButton]} onPress={() => navigation.navigate('EditProfile')}
          accessibilityLabel="Edit Profile"
          accessibilityRole="button">
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.uploadButton]} onPress={pickImage}
        accessibilityLabel="Upload Image"
        accessibilityRole="button">
          <Text style={styles.buttonText}>Upload Image</Text>
        </Pressable>
      </View>
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
    borderWidth: 2,
    borderColor: 'black',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  uploadButton: {
    backgroundColor: '#623b1d',
    marginTop: 0, // Reset the top margin
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  editButton: {
    backgroundColor: '#623b1d',
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
});