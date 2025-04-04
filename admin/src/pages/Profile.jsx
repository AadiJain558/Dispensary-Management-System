import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Profile = () => {
  const { darkMode } = useOutletContext();

  return (
    <div>
      <h1 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>My Profile</h1>
      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Profile page coming soon.</p>
    </div>
  );
};

export default Profile; 