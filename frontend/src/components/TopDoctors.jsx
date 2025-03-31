import React from 'react';
import { Link } from 'react-router-dom';
import { doctors } from '../assets/assets';

const TopDoctors = () => {
  // Get first 10 doctors to display
  const topDoctors = doctors.slice(0, 10);
  
  return (
    <div className="py-16 px-4 md:px-8 bg-muted/50 dark:bg-muted/10">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Top Doctors to Book
        </h2>
        
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Simply browse through our extensive list of trusted doctors.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {topDoctors.map((doctor) => (
            <Link to={`/appointment/${doctor._id}`} key={doctor._id}>
              <div className="bg-background dark:bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-primary/5 dark:bg-primary/10 p-6 flex items-center justify-center h-48">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-1">
                    <span className="inline-flex items-center text-green-600 dark:text-green-500 text-sm">
                      <span className="h-2 w-2 bg-green-500 dark:bg-green-400 rounded-full mr-1"></span>
                      Available
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {doctor.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {doctor.speciality}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Link to="/doctors">
            <button className="bg-muted hover:bg-muted/80 dark:bg-muted/20 dark:hover:bg-muted/30 text-foreground font-medium py-2 px-10 rounded-full transition-colors duration-300">
              more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopDoctors; 