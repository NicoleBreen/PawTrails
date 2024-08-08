import React, { createContext, useState } from 'react';

// Create a context to manage profile state
export const ProfileContext = createContext();

// Provider component that wraps the app 
// and provides profile state and update function
export const ProfileProvider = ({ children }) => {
  // Initialize the profile state with default values
  const [profile, setProfile] = useState({
    profileImage: require('../assets/profile_pic.png'), // Default profile image
    userName: 'Username', // Default username
    dogNames: ['Dog name'], // Default dog name
    bio: 'Write a bio here to introduce yourself to other Paw Trails users...', // Default bio
    photos: [], // Initialize with an empty array for photos
  });

  /**
   * Update the profile state with new values.
   * Only update dogNames and photos if they are arrays.
   * 
   * @param {object} newProfile - An object containing the new profile values.
   */
  const updateProfile = (newProfile) => {
    console.log('Updating profile with:', newProfile);
    setProfile((prevProfile) => {
      // Merge the new profile values with the existing profile state
      const updatedProfile = {
        ...prevProfile,
        ...newProfile,
        dogNames: Array.isArray(newProfile.dogNames) ? newProfile.dogNames : prevProfile.dogNames,
        photos: Array.isArray(newProfile.photos) ? newProfile.photos : prevProfile.photos,
      };
      console.log('Updated profile state:', updatedProfile);
      return updatedProfile;
    });
  };

  // Provide the profile state and the updateProfile function to children components
  return (
    <ProfileContext.Provider value={{ profile, setProfile: updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};