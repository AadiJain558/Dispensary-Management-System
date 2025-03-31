import React from 'react';
import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets';

const Specialities = () => {
  return (
    <div className="py-16 px-4 md:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Find by Speciality
        </h2>
        
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Simply browse through our extensive list of trusted doctors, schedule 
          your appointment hassle-free.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {specialityData.map((item, index) => (
            <Link to={`/doctors/${item.speciality.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
              <div className="flex flex-col items-center group">
                <div className="bg-primary/10 dark:bg-primary/5 rounded-full p-4 mb-4 w-32 h-32 flex items-center justify-center 
                  transform transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-2 
                  group-hover:bg-primary/20 dark:group-hover:bg-primary/10">
                  <img 
                    src={item.image} 
                    alt={item.speciality} 
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h3 className="text-center text-muted-foreground font-medium transition-colors duration-300 group-hover:text-primary">
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