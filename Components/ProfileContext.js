import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    profileImage: require('../assets/profile_pic.png'),
    userName: 'User',
    dogNames: ['Dog 1', 'Dog 2'],
    bio: 'Write a bio here to introduce yourself to other Paw Trails users...',
    photos: [],
  });

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};