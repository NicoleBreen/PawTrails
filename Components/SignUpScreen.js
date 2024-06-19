import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Ensures that the view is responsive and adjusts its size based on the device's screen width
const screenWidth = Dimensions.get('window').width;

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    // Reset error message
    setError('');

    // Validation logic
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Simulate a check for an existing user
    const existingUser = false; // Replace this with actual logic to check if the user exists

    if (existingUser) {
      setError('User already exists');
      return;
    }

    // Simulate a successful sign-up
    Alert.alert('Success', 'You have successfully signed up!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Login'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/logo_PT.png')} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>Sign Up!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
        <Text style={styles.signInText}>
          Already have an account?{' '}
          <Text style={styles.signInLink} onPress={() => navigation.navigate('Login')}>
            Sign in!
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccb7a4', // Light brown background
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    width: '100%',
    maxWidth: 400, 
    marginTop: 20, // Added some margin to move content up
  },
  image: {
    width: screenWidth * 0.8, 
    height: screenWidth * 0.8, 
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#623b1d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%', 
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20, 
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    fontSize: 16,
    color: '#1D2E57',
    marginBottom: 20,
  },
  signInLink: {
    color: '#1D2E57',
    fontWeight: 'bold',
  },
});