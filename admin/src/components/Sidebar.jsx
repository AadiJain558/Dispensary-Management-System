import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen, darkMode }) => {
  const location = useLocation();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Add Doctor',
      path: '/add-doctor',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
    },
    {
      name: 'Doctor List',
      path: '/doctor-list',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed top-0 left-0 z-20 h-full pt-16 flex flex-col flex-shrink-0 w-64 duration-300 lg:translate-x-0 transition-transform ${darkMode ? 'bg-[#0f172a] border-r border-gray-700' : 'bg-white border-r border-gray-200'}`}
    >
      <div className="relative flex-1 flex flex-col min-h-0 pt-6">
        <div className="flex-1 flex flex-col pt-1 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 space-y-2">
            {/* Categories */}
            <div className={`text-xs uppercase font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} px-2 mb-3`}>
              Management
            </div>
            
            {/* Navigation Items */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-3 py-3 transition-colors rounded-lg group ${
                      isActive 
                        ? darkMode
                          ? 'bg-indigo-600 text-white'
                          : 'bg-indigo-50 text-indigo-700'
                        : darkMode
                          ? 'text-gray-300 hover:bg-[#1e293b]'
                          : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              ))}
            </nav>
            
            {/* Second category */}
            <div className={`text-xs uppercase font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} px-2 mt-6 mb-3`}>
              Settings
            </div>
            
            <nav className="space-y-1">
              <NavLink
                to="/settings"
                className={({ isActive }) => 
                  `flex items-center px-3 py-3 transition-colors rounded-lg group ${
                    isActive 
                      ? darkMode
                        ? 'bg-indigo-600 text-white'
                        : 'bg-indigo-50 text-indigo-700'
                      : darkMode
                        ? 'text-gray-300 hover:bg-[#1e293b]'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span className="font-medium">General Settings</span>
              </NavLink>
              
              <NavLink
                to="/profile"
                className={({ isActive }) => 
                  `flex items-center px-3 py-3 transition-colors rounded-lg group ${
                    isActive 
                      ? darkMode
                        ? 'bg-indigo-600 text-white'
                        : 'bg-indigo-50 text-indigo-700'
                      : darkMode
                        ? 'text-gray-300 hover:bg-[#1e293b]'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <span className="font-medium">My Profile</span>
              </NavLink>
            </nav>
          </div>
        </div>
        
        <div className={`px-4 py-4 mb-2 ${darkMode ? 'bg-[#1e293b]' : 'bg-gray-50'} mx-3 rounded-lg`}>
          <div className="flex items-center">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${darkMode ? 'bg-indigo-600' : 'bg-indigo-500'} flex items-center justify-center text-white font-bold`}>
              P
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Prescripto</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>v1.2.0</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 