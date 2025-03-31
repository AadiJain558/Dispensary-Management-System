import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doctors, specialityData } from '../assets/assets';
import { useTheme } from '../components/ThemeProvider';

const Doctors = () => {
  const { specialization } = useParams();
  const { isDarkMode } = useTheme();
  const [selectedSpeciality, setSelectedSpeciality] = useState(specialization || 'all');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter doctors based on selected speciality and search query
  useEffect(() => {
    let filtered = doctors;
    
    // Filter by specialization if not 'all'
    if (selectedSpeciality !== 'all') {
      const formattedSpeciality = selectedSpeciality.replace(/-/g, ' ');
      filtered = doctors.filter(doctor => 
        doctor.speciality.toLowerCase() === formattedSpeciality.toLowerCase()
      );
    }
    
    // Filter by search query if present
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(query) || 
        doctor.speciality.toLowerCase().includes(query)
      );
    }
    
    setFilteredDoctors(filtered);
  }, [selectedSpeciality, searchQuery]);

  // Initialize selected speciality from URL params if available
  useEffect(() => {
    if (specialization) {
      setSelectedSpeciality(specialization);
    }
  }, [specialization]);

  return (
    <div className="pt-16 bg-background min-h-screen">
      {/* Page Header */}
      <div className="bg-primary text-white py-10">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Doctor</h1>
          <p className="text-white/80 max-w-2xl">
            Browse through our extensive list of qualified doctors and specialists. 
            Filter by specialization or search to find the perfect healthcare professional for your needs.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto max-w-7xl px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search doctors by name or speciality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-10 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Specialization Filter */}
        <div className="mb-10">
          <h2 className="text-foreground text-xl mb-4 font-semibold">Categories</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedSpeciality('all')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedSpeciality === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              All Doctors
            </button>
            
            {specialityData.map((speciality, index) => (
              <button
                key={index}
                onClick={() => setSelectedSpeciality(speciality.speciality.toLowerCase().replace(/\s+/g, '-'))}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedSpeciality === speciality.speciality.toLowerCase().replace(/\s+/g, '-')
                    ? 'bg-primary text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {speciality.speciality}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Cards */}
        <div>
          <h2 className="text-foreground text-2xl font-bold mb-6">
            {selectedSpeciality === 'all'
              ? 'All Doctors'
              : `${selectedSpeciality.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Specialists`}
            {filteredDoctors.length > 0 && <span className="text-muted-foreground text-lg ml-2">({filteredDoctors.length})</span>}
          </h2>
          
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 mx-auto text-muted-foreground mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-foreground mb-2">No doctors found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDoctors.map((doctor) => (
                <Link to={`/appointment/${doctor._id}`} key={doctor._id}>
                  <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full">
                    <div className="bg-primary/5 dark:bg-primary/10 p-6 flex items-center justify-center h-60">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center text-green-600 dark:text-green-500 text-sm">
                          <span className="h-2 w-2 bg-green-500 dark:bg-green-400 rounded-full mr-1"></span>
                          Available
                        </span>
                        <span className="ml-auto text-sm text-muted-foreground">{doctor.experience}</span>
                      </div>
                      <h3 className="font-semibold text-foreground text-lg mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {doctor.speciality} • {doctor.degree}
                      </p>
                      <div className="flex items-center mt-3">
                        <div className="flex text-amber-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg 
                              key={star}
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">
                          (120+ reviews)
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-5">
                        <span className="text-primary text-lg font-bold">${doctor.fees}</span>
                        <button 
                          className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
