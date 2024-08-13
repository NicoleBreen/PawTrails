import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EditProfileScreen from '../Components/EditProfileScreen';
import { ProfileProvider } from '../Components/ProfileContext';
import { NavigationContainer } from '@react-navigation/native';
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

const renderWithContext = (component) => {
  return render(
    <NavigationContainer>
      <ProfileProvider>
        {component}
      </ProfileProvider>
    </NavigationContainer>
  );
};

test('renders EditProfileScreen correctly', () => {
  const { getByPlaceholderText, getByText } = renderWithContext(<EditProfileScreen />);
  
  expect(getByPlaceholderText('User Name')).toBeTruthy();
  expect(getByPlaceholderText('Introduce yourself and your dog(s)!...')).toBeTruthy();
  expect(getByText('Save')).toBeTruthy();
  expect(getByText('Cancel')).toBeTruthy();
  expect(getByText('Add Dog')).toBeTruthy();
});

test('shows validation errors when required fields are missing', async () => {
  const { getByText, getByPlaceholderText } = renderWithContext(<EditProfileScreen />);
  
  const userNameInput = getByPlaceholderText('User Name');
  const bioInput = getByPlaceholderText('Introduce yourself and your dog(s)!...');
  
  fireEvent.changeText(userNameInput, '');
  fireEvent.changeText(bioInput, '');  // Ensure bio is also empty
  
  fireEvent.press(getByText('Save'));

  await waitFor(() => {
    expect(getByText('Validation Error: User name is required.')).toBeTruthy();
  });
});

test('updates profile information', async () => {
  const { getByPlaceholderText, getByText } = renderWithContext(<EditProfileScreen />);
  
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

});