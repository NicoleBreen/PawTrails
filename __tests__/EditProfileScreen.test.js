import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EditProfileScreen from '../Components/EditProfileScreen';
import ProfileScreen from '../Components/ProfileScreen';
import { ProfileProvider } from '../Components/ProfileContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';

// Mocking necessary libraries
jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: {
    All: 'All',
  },
}));

jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    PanGestureHandler: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  };
});

// Mocking navigation
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
    }),
  };
});

const Stack = createNativeStackNavigator();

const renderWithNavigation = (component) => {
  return render(
    <NavigationContainer>
      <ProfileProvider>
        <Stack.Navigator initialRouteName="EditProfile">
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </ProfileProvider>
    </NavigationContainer>
  );
};

test('renders EditProfileScreen correctly', () => {
  const { getByPlaceholderText, getByText } = renderWithNavigation(<EditProfileScreen />);
  
  expect(getByPlaceholderText('User Name')).toBeTruthy();
  expect(getByPlaceholderText('Introduce yourself and your dog(s)!...')).toBeTruthy();
  expect(getByText('Save')).toBeTruthy();
  expect(getByText('Cancel')).toBeTruthy();
  expect(getByText('Add Dog')).toBeTruthy();
});

test('shows validation errors when required fields are missing', async () => {
  const { getByText, getByPlaceholderText } = renderWithNavigation(<EditProfileScreen />);
  
  const userNameInput = getByPlaceholderText('User Name');
  const bioInput = getByPlaceholderText('Introduce yourself and your dog(s)!...');
  
  fireEvent.changeText(userNameInput, '');
  fireEvent.changeText(bioInput, '');  // Make sure bio is also empty
  
  fireEvent.press(getByText('Save'));

  await waitFor(() => {
    expect(getByText('Validation Error: User name is required.')).toBeTruthy();
  });
});

test('updates profile and navigates to ProfileScreen on save', async () => {
  const { getByPlaceholderText, getByText } = renderWithNavigation(<EditProfileScreen />);
  
  const userNameInput = getByPlaceholderText('User Name');
  const bioInput = getByPlaceholderText('Introduce yourself and your dog(s)!...');
  fireEvent.changeText(userNameInput, 'John Doe');
  fireEvent.changeText(bioInput, 'This is a bio.');

  // Simulate adding a dog name
  fireEvent.press(getByText('Add Dog'));
  const dogNameInput = getByPlaceholderText('Dog 1');
  fireEvent.changeText(dogNameInput, 'Rex');

  // Mock Image Picker Result
  ImagePicker.launchImageLibraryAsync.mockResolvedValueOnce({
    canceled: false,
    assets: [{ uri: 'test-uri' }],
  });

  // Simulate picking an image
  const imagePickerButton = getByText('Change profile picture');
  fireEvent.press(imagePickerButton);
  await waitFor(() => expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled());

  const saveButton = getByText('Save');
  fireEvent.press(saveButton);

  await waitFor(() => {
    try {
      console.log('mockNavigate calls:', mockNavigate.mock.calls); // Log the calls to mockNavigate
      expect(mockNavigate).toHaveBeenCalledWith('Profile');
    } catch (error) {
      console.error('Navigation was not called correctly:', error);
      throw error;
    }
  });
});

test('discards changes and navigates back on cancel', async () => {
  const { getByPlaceholderText, getByText } = renderWithNavigation(<EditProfileScreen />);
  
  const userNameInput = getByPlaceholderText('User Name');
  fireEvent.changeText(userNameInput, 'John Doe');

  const cancelButton = getByText('Cancel');
  fireEvent.press(cancelButton);

  await waitFor(() => {
    try {
      expect(mockGoBack).toHaveBeenCalled();
    } catch (error) {
      console.error('Go back was not called correctly:', error);
      throw error;
    }
  });
});