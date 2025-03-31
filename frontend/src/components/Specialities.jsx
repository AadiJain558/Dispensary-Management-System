import React from 'react';
import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets';

const Specialities = () => {
  return (
    <div className="py-16 px-4 md:px-16">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Find by Speciality
        </h2>
        
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Simply browse through our extensive list of trusted doctors, schedule 
          your appointment hassle-free.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {specialityData.map((item, index) => (
            <Link to={`/doctors/${item.speciality.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full p-4 mb-4 w-32 h-32 flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.speciality} 
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h3 className="text-center text-gray-700 font-medium">
                  {item.speciality}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Specialities; 