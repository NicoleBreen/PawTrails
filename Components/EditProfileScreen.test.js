import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EditProfileScreen from './EditProfileScreen';
import { ProfileContext } from './ProfileContext';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn().mockResolvedValue({
    canceled: false,
    assets: [{ uri: 'mocked-image-uri' }],
  }),
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: jest.fn(),
  }),
}));

const renderWithProviders = (ui, { providerProps }) => {
  return render(
    <ProfileContext.Provider {...providerProps}>
      <NavigationContainer>{ui}</NavigationContainer>
    </ProfileContext.Provider>
  );
};

describe('EditProfileScreen', () => {
  const profile = {
    userName: 'JohnDoe',
    dogNames: ['Buddy'],
    bio: 'I love dogs!',
    profileImage: null,
  };

  const setProfile = jest.fn();

  const providerProps = {
    value: { profile, setProfile },
  };

  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <EditProfileScreen />,
      { providerProps }
    );

    expect(getByText('Change profile picture')).toBeTruthy();
    expect(getByPlaceholderText('User Name').props.value).toBe('JohnDoe');
    expect(getByPlaceholderText('Dog 1').props.value).toBe('Buddy');
    expect(getByText('Save')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  test('allows user to change profile image', async () => {
    const { getByText } = renderWithProviders(<EditProfileScreen />, {
      providerProps,
    });

    const changePictureButton = getByText('Change profile picture');
    fireEvent.press(changePictureButton);

    await waitFor(() => {
      expect(setProfile).not.toHaveBeenCalled();
    });
  });

  test('displays error if user name is empty', () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <EditProfileScreen />,
      { providerProps }
    );

    const userNameInput = getByPlaceholderText('User Name');
    fireEvent.changeText(userNameInput, '');

    const saveButton = getByText('Save');
    fireEvent.press(saveButton);

    expect(getByText('Validation Error: User name is required.')).toBeTruthy();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('displays error if dog name is empty', () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <EditProfileScreen />,
      { providerProps }
    );

    const dogNameInput = getByPlaceholderText('Dog 1');
    fireEvent.changeText(dogNameInput, '');

    const saveButton = getByText('Save');
    fireEvent.press(saveButton);

    expect(
      getByText('Validation Error: Input at least one dog name.')
    ).toBeTruthy();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('saves profile and navigates back on valid input', () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <EditProfileScreen />,
      { providerProps }
    );

    const userNameInput = getByPlaceholderText('User Name');
    fireEvent.changeText(userNameInput, 'JaneDoe');

    const saveButton = getByText('Save');
    fireEvent.press(saveButton);

    expect(setProfile).toHaveBeenCalledWith({
      profileImage: null,
      userName: 'JaneDoe',
      dogNames: ['Buddy'],
      bio: 'I love dogs!',
    });

    expect(mockNavigate).toHaveBeenCalledWith('Profile');
  });

  test('can add and remove dog names', () => {
    const { getByText, getAllByPlaceholderText } = renderWithProviders(
      <EditProfileScreen />,
      { providerProps }
    );

    const addButton = getByText('Add Dog');
    fireEvent.press(addButton);

    let dogNameInputs = getAllByPlaceholderText(/Dog \d/);
    expect(dogNameInputs).toHaveLength(2);

    const removeButton = getByText('Remove dog 2 name');
    fireEvent.press(removeButton);

    dogNameInputs = getAllByPlaceholderText(/Dog \d/);
    expect(dogNameInputs).toHaveLength(1);
  });

  test('displays error if bio is empty', () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <EditProfileScreen />,
      { providerProps }
    );

    const bioInput = getByPlaceholderText(
      'Introduce yourself and your dog(s)!...'
    );
    fireEvent.changeText(bioInput, '');

    const saveButton = getByText('Save');
    fireEvent.press(saveButton);

    expect(getByText('Validation Error: Bio is required.')).toBeTruthy();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});