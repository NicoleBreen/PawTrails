import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Image source={require('../assets/profile_pic.png')} style={styles.profileImage} />
        <Text style={styles.subtitle}>User Name</Text>
        <Text style={styles.info}>Email: user@example.com</Text>
      </View>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Home</Text>
      </Pressable>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccb7a4', // Light brown background
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
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
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#623b1d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});