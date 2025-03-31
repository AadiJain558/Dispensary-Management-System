import React from 'react';
import { Link } from 'react-router-dom';
import headerImg from '../assets/header_img.png';
import groupProfiles from '../assets/group_profiles.png';

const Header = () => {
  return (
    <div className="bg-primary w-full border-t border-border relative dark:border-border/20">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Book Appointment<br />
              With Trusted Doctors
            </h1>
            
            <div className="flex items-center mb-6">
              <img 
                src={groupProfiles} 
                alt="User profiles" 
                className="h-10 mr-4" 
              />
              <p className="text-white/90 text-sm md:text-base">
                Simply browse through our extensive list of trusted doctors,<br />
                schedule your appointment hassle-free.
              </p>
            </div>
            
            <Link to="/doctors" className="inline-block">
              <button className="bg-white dark:bg-white/90 text-primary hover:bg-white/90 dark:hover:bg-white px-6 py-3 rounded-full font-medium flex items-center transition-colors">
                Book appointment 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </div>
          
          <div className="w-full md:w-1/2 flex items-end justify-end">
            <img 
              src={headerImg} 
              alt="Medical professionals team" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
