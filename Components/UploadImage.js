import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ProfileContext } from './ProfileContext';

export default function UploadImage() {
  const { profile, setProfile } = useContext(ProfileContext);

  const addImage = async () => {
    console.log("Opening image picker...");
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Please grant camera roll permissions inside your system's settings");
      return;
    }

    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Image picker result: ", _image);

    if (!_image.canceled && _image.assets && _image.assets.length > 0) {
      const imageUri = _image.assets[0].uri;
      setProfile((prevProfile) => {
        if (imageUri) {
          const newPhotos = [...prevProfile.photos, { uri: imageUri }];
          console.log("Updated photos array in setProfile: ", newPhotos);
          return {
            ...prevProfile,
            photos: newPhotos
          };
        }
        return prevProfile;
      });
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert("Please grant camera roll permissions inside your system's settings");
      }
    })();
  }, []);

  return (
    <View style={imageUploaderStyles.container}>
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn}>
          <Text>{'Upload'} Photo</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center'
  }
});