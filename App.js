import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Components/LoginScreen';
import ProfileScreen from './Components/ProfileScreen';
import SignUpScreen from './Components/SignUpScreen';
import EditProfileScreen from './Components/EditProfileScreen';
import { ProfileProvider } from './Components/ProfileContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }} // Hide header for HomeScreen
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }} // Hide header for ProfileScreen
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }} // Hide header for SignUpScreen
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ headerShown: false }} // Hide header for EditProfileScreen
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </ProfileProvider>
  );
}