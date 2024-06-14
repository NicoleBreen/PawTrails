import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/logo_PT.png')} style={styles.image} resizeMode="contain" />
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
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>  
        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>
            Sign up!
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
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400, // Limit content to a reasonable width
  },
  image: {
    width: screenWidth * 0.8, // 80% of the screen width
    height: screenWidth * 0.8, // Set height to maintain aspect ratio
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
    width: '100%', // Full width
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20, // Adjust as needed to position it above the bottom padding
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: '#1D2E57',
    marginBottom: 20,
  },
  signUpLink: {
    color: '#1D2E57',
    fontWeight: 'bold',
  },
});