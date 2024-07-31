import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    profileImage: require('../assets/profile_pic.png'),
    userName: 'User',
    dogNames: ['Dog 1', 'Dog 2'],
    bio: 'Write a bio here to introduce yourself to other Paw Trails users...',
    photos: [], // Ensure this is an empty array initially
  });

  const updateProfile = (newProfile) => {
    console.log('Updating profile with:', newProfile);
    setProfile((prevProfile) => {
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

  return (
    <ProfileContext.Provider value={{ profile, setProfile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};