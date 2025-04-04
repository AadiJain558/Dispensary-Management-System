import React from 'react';
import { useOutletContext } from 'react-router-dom';

const DoctorList = () => {
  const { darkMode } = useOutletContext();

  return (
    <div>
      <h1 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Doctor List</h1>
      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Doctor list page coming soon.</p>
    </div>
  );
};

export default DoctorList; 