import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Dimensions, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// adjusts size of view based on the device's screen width
const screenWidth = Dimensions.get('window').width;

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in both email and password.');
      return;
    }

    // Simulate login check
    if (email && password) {
      // Show success alert
      Alert.alert('Success', 'Successfully logged in!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('MainTabs', { screen: 'Profile' }),
        },
      ]);
    } else {
      Alert.alert('Error', 'Invalid email or password.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Image 
            source={require('../assets/logo_PT.png')} 
            style={styles.image} 
            resizeMode="contain" 
            accessible={true} 
            accessibilityLabel="App logo" 
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              accessible={true}
              accessibilityLabel="Email input"
              accessibilityHint="Enter your email address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              accessible={true}
              accessibilityLabel="Password input"
              accessibilityHint="Enter your password"
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Pressable 
            style={styles.button} 
            onPress={handleLogin} 
            accessible={true} 
            accessibilityLabel="Login button" 
            accessibilityHint="Tap to log in"
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>  
          <Text style={styles.signUpText}>
            Don't have an account?{' '}
            <Text 
              style={styles.signUpLink} 
              onPress={() => navigation.navigate('SignUp')}
              accessible={true}
              accessibilityLabel="Sign up link"
              accessibilityHint="Tap to sign up"
              accessibilityRole="link"
            >
              Sign up!
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccb7a4', // Light brown background
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400, 
  },
  image: {
    width: screenWidth * 0.8, 
    height: screenWidth * 0.8, 
    marginBottom: 20,
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
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  signUpText: {
    fontSize: 16,
    color: '#1D2E57',
  },
  signUpLink: {
    color: '#1D2E57',
    fontWeight: 'bold',
  },
});