import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProfileContext } from './ProfileContext';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { profile, setProfile } = useContext(ProfileContext);

  const [profileImage, setProfileImage] = useState(profile.profileImage);
  const [userName, setUserName] = useState(profile.userName);
  const [dogNames, setDogNames] = useState(profile.dogNames);
  const [bio, setBio] = useState(profile.bio);
  const [photos, setPhotos] = useState(profile.photos);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const addPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, { uri: result.assets[0].uri }]);
    }
  };

  const handleSave = () => {
    setProfile({ profileImage, userName, dogNames, bio, photos });
    navigation.navigate('Profile');
  };

  const addDogName = () => {
    setDogNames([...dogNames, '']);
  };

  const removeDogName = (index) => {
    const newDogNames = [...dogNames];
    newDogNames.splice(index, 1);
    setDogNames(newDogNames);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Edit Profile</Text>
        <Pressable onPress={pickImage}>
          <Image source={profileImage} style={styles.profileImage} />
        </Pressable>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="User Name"
        />
        {dogNames.map((dogName, index) => (
          <View key={index} style={styles.dogNameContainer}>
            <TextInput
              style={styles.input}
              value={dogName}
              onChangeText={text => {
                const newDogNames = [...dogNames];
                newDogNames[index] = text;
                setDogNames(newDogNames);
              }}
              placeholder={`Dog Name ${index + 1}`}
            />
            <Pressable onPress={() => removeDogName(index)}>
              <Icon name="close" size={24} color="#FF6347" />
            </Pressable>
          </View>
        ))}
        <Pressable style={styles.addButton} onPress={addDogName}>
          <Text style={styles.buttonText}>Add Dog</Text>
        </Pressable>
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={bio}
          onChangeText={setBio}
          multiline
          placeholder="Write a short bio..."
        />
        <Text style={styles.photoTitle}>Photos:</Text>
        <View style={styles.photosContainer}>
          {photos.map((photo, index) => (
            <Image key={index} source={photo} style={styles.photo} />
          ))}
        </View>
        <Pressable style={styles.addPhotoButton} onPress={addPhoto}>
          <Text style={styles.buttonText}>Add Photo</Text>
        </Pressable>
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ccb7a4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: '85%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  dogNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#623b1d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  bioInput: {
    textAlignVertical: 'top',
    height: 100,
  },
  photoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  photosContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
  addPhotoButton: {
    backgroundColor: '#623b1d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#623b1d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#623b1d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});