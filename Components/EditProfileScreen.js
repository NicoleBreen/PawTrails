import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProfileContext } from './ProfileContext';
import logo from '../assets/logo_long.png';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { profile, setProfile } = useContext(ProfileContext);

  // Initialise state variables
  const defaultUserName = profile.userName === 'Add User Name' ? '' : profile.userName;
  const defaultDogNames = profile.dogNames.map(name => name === 'Add Dog Name' ? '' : name);
  const defaultBio = profile.bio === 'Write a bio here to introduce yourself to other Paw Trails users...' ? '' : profile.bio;

  const [profileImage, setProfileImage] = useState(profile.profileImage || null);
  const [userName, setUserName] = useState(defaultUserName);
  const [dogNames, setDogNames] = useState(defaultDogNames.length ? defaultDogNames : ['']);
  const [bio, setBio] = useState(defaultBio);
  const [error, setError] = useState('');

  /**
   * Pick an image from the image library and set it as the profile image
   */
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

  /**
   * Handle the save action, including validation and updating the profile context
   */
  const handleSave = () => {
    if (!userName.trim()) {
      setError('Validation Error: User name is required.');
      return;
    }
    for (const dogName of dogNames) {
      if (!dogName.trim()) {
        setError('Validation Error: Input at least one dog name.');
        return;
      }
    }
    if (!bio.trim()) {
      setError('Validation Error: Bio is required.');
      return;
    }
    setProfile({ profileImage, userName, dogNames, bio });
    navigation.navigate('Profile');
  };

  /**
   * Handle the cancel action, displaying an alert and navigating back
   */
  const handleCancel = () => {
    Alert.alert('Changes Discarded', 'Your changes have been discarded.');
    navigation.goBack();
  };

  /**
   * Add an empty dog name input field
   */
  const addDogName = () => {
    setDogNames([...dogNames, '']);
  };

  /**
   * Remove a dog name input field by its index
   * 
   * @param {number} index - The index of the dog name to remove
   */
  const removeDogName = (index) => {
    const newDogNames = [...dogNames];
    newDogNames.splice(index, 1);
    setDogNames(newDogNames);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Image source={logo} style={styles.logo} accessibilityLabel="App logo" />
        <Pressable onPress={pickImage} accessibilityLabel="Change profile picture" accessibilityRole="button">
          <Image source={profileImage} style={styles.profileImage} />
          <Text style={styles.changePictureText}>Change profile picture</Text>
        </Pressable>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="User Name"
            accessibilityLabel="User Name"
            accessibilityHint="Enter your user name"
            onFocus={() => setUserName('')}
          />
        </View>
        {dogNames.map((dogName, index) => (
          <View key={index} style={styles.dogNameContainer}>
            <TextInput
              style={styles.dogNameInput}
              value={dogName}
              onChangeText={text => {
                const newDogNames = [...dogNames];
                newDogNames[index] = text;
                setDogNames(newDogNames);
              }}
              placeholder={`Dog ${index + 1}`}
              accessibilityLabel={`Dog ${index + 1} Name`}
              accessibilityHint={`Enter the name of dog ${index + 1}`}
              onFocus={() => {
                const newDogNames = [...dogNames];
                newDogNames[index] = '';
                setDogNames(newDogNames);
              }}
            />
            <Pressable style={styles.closeButton} onPress={() => removeDogName(index)}
              accessibilityLabel={`Remove dog ${index + 1} name`}
              accessibilityRole="button">
              <Icon name="close" size={24} color="#000" />
            </Pressable>
          </View>
        ))}
        <View style={styles.inputContainer}>
          <Pressable style={styles.addButton} onPress={addDogName}
            accessibilityLabel="Add Dog Name"
            accessibilityHint="Add a new dog name input field"
            accessibilityRole="button">
            <Text style={styles.buttonText}>Add Dog</Text>
          </Pressable>
        </View>
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={bio}
          onChangeText={setBio}
          multiline
          placeholder="Introduce yourself and your dog(s)!..."
          accessibilityLabel="Bio"
          accessibilityHint="Write a short bio about yourself and your dog(s)"
          onFocus={() => setBio('')}
        />
        <View style={styles.buttonRow}>
          <Pressable style={styles.saveButton} onPress={handleSave} accessibilityLabel="Save" accessibilityRole="button">
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={handleCancel} accessibilityLabel="Cancel" accessibilityRole="button">
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
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
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePictureText: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  inputContainer: {
    width: '85%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  dogNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '85%',
  },
  dogNameInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  closeButton: {
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#623b1d',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  bioInput: {
    textAlignVertical: 'top',
    height: 100,
    marginBottom: 5,
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#623b1d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
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