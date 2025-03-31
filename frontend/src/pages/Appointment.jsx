import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doctors } from '../assets/assets';
import { useTheme } from '../components/ThemeProvider';

const Appointment = () => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Generate available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  // Time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  // Fetch doctor details and related doctors
  useEffect(() => {
    // Find the doctor by ID
    const foundDoctor = doctors.find(doc => doc._id === id);
    
    if (foundDoctor) {
      setDoctor(foundDoctor);
      
      // Find related doctors (same speciality but not the same doctor)
      const related = doctors.filter(doc => 
        doc.speciality === foundDoctor.speciality && doc._id !== foundDoctor._id
      ).slice(0, 4); // Get up to 4 related doctors
      
      setRelatedDoctors(related);
    } else {
      // Handle case where doctor is not found
      navigate('/doctors');
    }
    
    setLoading(false);
  }, [id, navigate]);

  const handleBookAppointment = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // Check if date and time are selected
    if (selectedDate && selectedTime) {
      // Show success message (in a real app, you would make an API call here)
      setBookingSuccess(true);
      
      // Reset form after 5 seconds and redirect
      setTimeout(() => {
        setBookingSuccess(false);
        setFormSubmitted(false);
        navigate('/my-appointments');
      }, 5000);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 flex justify-center items-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="pt-24 flex flex-col justify-center items-center min-h-screen bg-background">
        <h2 className="text-2xl font-bold text-foreground mb-4">Doctor not found</h2>
        <Link to="/doctors" className="text-primary hover:underline">
          Browse all doctors
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-background min-h-screen">
      {/* Doctor Profile Header */}
      <div className="bg-primary/5 dark:bg-primary/10 border-b border-border">
        <div className="container mx-auto max-w-7xl px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-background rounded-lg overflow-hidden shadow-md border border-border">
                <div className="p-6 flex items-center justify-center">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-auto max-w-[240px] object-contain"
                  />
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 lg:w-3/4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center text-green-600 dark:text-green-500 text-sm bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                  <span className="h-2 w-2 bg-green-500 dark:bg-green-400 rounded-full mr-1"></span>
                  Available
                </span>
                <span className="text-muted-foreground text-sm">{doctor.experience} Experience</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{doctor.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-primary font-medium">{doctor.speciality}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{doctor.degree}</span>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star}
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-foreground ml-2">
                    5.0
                  </span>
                  <span className="text-muted-foreground ml-2">
                    (120+ reviews)
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">About Doctor</h3>
                  <p className="text-muted-foreground">{doctor.about}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Location</h3>
                  <p className="text-muted-foreground">
                    {doctor.address.line1}, <br/>
                    {doctor.address.line2}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Consultation Fee</h3>
                  <p className="text-2xl font-bold text-primary">${doctor.fees}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Book Appointment Section */}
      <div className="container mx-auto max-w-7xl px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">Book Appointment</h2>
              
              {bookingSuccess ? (
                <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 p-4 rounded-lg mb-6">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Appointment booked successfully!</span>
                  </div>
                  <p className="mt-2 text-sm">
                    Your appointment with {doctor.name} has been scheduled for {selectedDate} at {selectedTime}.
                    Redirecting to your appointments...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookAppointment}>
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-4">Select Date</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                      {availableDates.map((date) => {
                        const dateObj = new Date(date);
                        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                        const dayNumber = dateObj.getDate();
                        const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
                        
                        return (
                          <button
                            key={date}
                            type="button"
                            onClick={() => setSelectedDate(date)}
                            className={`p-3 rounded-lg text-center transition-colors ${
                              selectedDate === date
                                ? 'bg-primary text-white'
                                : 'bg-background border border-border hover:bg-muted'
                            }`}
                          >
                            <div className="font-medium">{dayName}</div>
                            <div className="text-lg font-bold">{dayNumber}</div>
                            <div className="text-sm">{month}</div>
                          </button>
                        );
                      })}
                    </div>
                    {formSubmitted && !selectedDate && (
                      <p className="text-red-500 text-sm mt-2">Please select a date</p>
                    )}
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-semibold text-foreground mb-4">Select Time</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 px-4 rounded-lg text-center transition-colors ${
                            selectedTime === time
                              ? 'bg-primary text-white'
                              : 'bg-background border border-border hover:bg-muted'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {formSubmitted && !selectedTime && (
                      <p className="text-red-500 text-sm mt-2">Please select a time</p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-border pt-6">
                    <div>
                      <span className="text-muted-foreground">Total Fee:</span>
                      <span className="ml-2 text-xl font-bold text-primary">${doctor.fees}</span>
                    </div>
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Confirm Appointment
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-1/3">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-foreground mb-4">Why Choose Us</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-foreground">Verified Professionals</h4>
                    <p className="text-sm text-muted-foreground">All our doctors are verified professionals</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-foreground">24/7 Availability</h4>
                    <p className="text-sm text-muted-foreground">Get consultations at your convenience</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-foreground">Secure Payments</h4>
                    <p className="text-sm text-muted-foreground">Multiple payment options available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Doctors Section */}
      {relatedDoctors.length > 0 && (
        <div className="bg-muted/50 dark:bg-muted/10 py-12">
          <div className="container mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Similar Doctors</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedDoctors.map((relatedDoctor) => (
                <Link to={`/appointment/${relatedDoctor._id}`} key={relatedDoctor._id}>
                  <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full">
                    <div className="bg-primary/5 dark:bg-primary/10 p-6 flex items-center justify-center h-48">
                      <img 
                        src={relatedDoctor.image} 
                        alt={relatedDoctor.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center text-green-600 dark:text-green-500 text-sm">
                          <span className="h-2 w-2 bg-green-500 dark:bg-green-400 rounded-full mr-1"></span>
                          Available
                        </span>
                        <span className="ml-auto text-sm text-muted-foreground">{relatedDoctor.experience}</span>
                      </div>
                      <h3 className="font-semibold text-foreground text-lg mb-1">
                        {relatedDoctor.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {relatedDoctor.speciality} • {relatedDoctor.degree}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-primary text-lg font-bold">${relatedDoctor.fees}</span>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
