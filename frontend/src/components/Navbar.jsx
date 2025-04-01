import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import './Navbar.css'
import { useTheme } from './ThemeProvider'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context in a real app
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    setIsLoggedIn(false);
    setIsProfileMenuOpen(false);
  };

  // For demo purposes, let's add a function to toggle login state
  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="logo-container">
            <img src={assets.logo} alt="Dispensary Logo" className="logo" />
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <ul className="nav-links">
              <NavLink to="/" className={({ isActive }) => 
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }>
                {({ isActive }) => (
                  <li className="nav-link-text">
                    Home
                    <div className={`nav-link-indicator ${isActive ? 'nav-link-active' : ''}`}></div>
                  </li>
                )}
              </NavLink>
              <NavLink to="/doctors" className={({ isActive }) => 
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }>
                {({ isActive }) => (
                  <li className="nav-link-text">
                    Doctors
                    <div className={`nav-link-indicator ${isActive ? 'nav-link-active' : ''}`}></div>
                  </li>
                )}
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => 
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }>
                {({ isActive }) => (
                  <li className="nav-link-text">
                    About
                    <div className={`nav-link-indicator ${isActive ? 'nav-link-active' : ''}`}></div>
                  </li>
                )}
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => 
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }>
                {({ isActive }) => (
                  <li className="nav-link-text">
                    Contact
                    <div className={`nav-link-indicator ${isActive ? 'nav-link-active' : ''}`}></div>
                  </li>
                )}
              </NavLink>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <button 
              onClick={toggleDarkMode}
              className="dark-mode-button"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            {isLoggedIn ? (
              <div className={`profile-container ${isProfileMenuOpen ? 'open' : ''}`} onClick={toggleProfileMenu}>
                <img src={assets.profile_pic} alt="Profile" className="profile-picture" />
                <svg xmlns="http://www.w3.org/2000/svg" className="profile-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                
                {/* Profile Dropdown Menu */}
                <div className="dropdown-menu">
                  <NavLink to="/my-profile" className="dropdown-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="dropdown-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </NavLink>
                  <NavLink to="/my-appointments" className="dropdown-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="dropdown-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    My Appointments
                  </NavLink>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="dropdown-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <NavLink to="/register">
                <button className="signup-button" onClick={toggleLoginState}>
                  Create Account
                </button>
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button
              onClick={toggleMenu}
              className="mobile-button"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <NavLink to="/" className={({ isActive }) => 
            `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`
          }>
            Home
          </NavLink>
          <NavLink to="/doctors" className={({ isActive }) => 
            `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`
          }>
            Doctors
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => 
            `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`
          }>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => 
            `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`
          }>
            Contact
          </NavLink>
          
          {isLoggedIn ? (
            <>
              <div className="mobile-profile-container">
                <img src={assets.profile_pic} alt="Profile" className="profile-picture" />
                <div className="mobile-profile-info">
                  <div className="mobile-profile-name">John Doe</div>
                  <div className="mobile-profile-email">john.doe@example.com</div>
                </div>
              </div>
              <NavLink to="/my-profile" className="mobile-nav-link">
                My Profile
              </NavLink>
              <NavLink to="/my-appointments" className="mobile-nav-link">
                My Appointments
              </NavLink>
              <button onClick={handleLogout} className="mobile-nav-link logout-item">
                Logout
              </button>
            </>
          ) : (
            <div className="mobile-footer">
              <button
                onClick={toggleDarkMode}
                className="dark-mode-button"
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <NavLink to="/register" className="mobile-signup-link">
                <button className="mobile-signup-button" onClick={toggleLoginState}>
                  Create Account
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
