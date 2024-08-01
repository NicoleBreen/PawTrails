import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './Components/LoginScreen';
import ProfileScreen from './Components/ProfileScreen';
import SignUpScreen from './Components/SignUpScreen';
import EditProfileScreen from './Components/EditProfileScreen';
import WalkScreen from './Components/WalkScreen';
import MyWalksScreen from './Components/MyWalksScreen'; 
import BadgesScreen from './Components/BadgesScreen'; 
import { ProfileProvider } from './Components/ProfileContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tab navigator with four tabs for Profile, Walk, My Walks, and Badges
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Walk') {
            iconName = focused ? 'walk' : 'walk-outline';
          } else if (route.name === 'My Walks') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Badges') {
            iconName = focused ? 'ribbon' : 'ribbon-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#623b1d',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Walk" component={WalkScreen} options={{ headerShown: false }} />
      <Tab.Screen name="My Walks" component={MyWalksScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Badges" component={BadgesScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// Stack navigator sets LoginScreen as home (initial route)
export default function App() {
  return (
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainTabs"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </ProfileProvider>
  );
}