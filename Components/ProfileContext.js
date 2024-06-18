import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    profileImage: require('../assets/profile_pic.png'),
    userName: 'User Name',
    dogNames: ['Dog 1', 'Dog 2'],
    bio: 'This is a short bio.',
    photos: [],
  });

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};