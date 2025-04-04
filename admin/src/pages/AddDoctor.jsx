import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

const AddDoctor = () => {
  const { darkMode } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    degree: '',
    experience: '',
    about: '',
    fees: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const data = new FormData();
      for (const key in formData) {
        if (key === 'address') {
          data.append(key, JSON.stringify(formData[key]));
        } else if (key === 'image') {
          if (formData.image) {
            data.append('image', formData.image);
          }
        } else {
          data.append(key, formData[key]);
        }
      }

      // Log form data for debugging (remove in production)
      console.log('Form data keys being sent:');
      for (let pair of data.entries()) {
        console.log(pair[0] + ': ' + (pair[0] === 'image' ? 'File data' : pair[1]));
      }

      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setMessage({ text: 'Authentication token missing. Please login again.', type: 'error' });
        setLoading(false);
        return;
      }

      console.log('Sending request to:', `${backendUrl}/api/admin/add-doctor`);
      console.log('Using token:', token ? 'Token exists' : 'No token');
      
      const response = await axios.post(
        `${backendUrl}/api/admin/add-doctor`, 
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      console.log('Response:', response.data);
      setMessage({ text: 'Doctor added successfully!', type: 'success' });
      setFormData({
        name: '',
        email: '',
        password: '',
        specialization: '',
        degree: '',
        experience: '',
        about: '',
        fees: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        },
        image: null,
      });
      document.getElementById('image').value = '';
    } catch (error) {
      console.error('Error adding doctor:', error);
      console.error('Error response:', error.response?.data);
      
      let errorMessage = 'Error adding doctor';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data?.message || 'Server error: ' + error.response.status;
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your connection.';
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = 'Error setting up request: ' + error.message;
      }
      
      setMessage({ 
        text: errorMessage, 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Add Doctor</h1>
      
      {message.text && (
        <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className={`block mb-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
            
            <div>
              <label className={`block mb-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
            
            <div>
              <label className={`block mb-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password* (min 8 characters)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
            
            <div>
              <label className={`block mb-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Specialization*
              </label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
            
            <div>
              <label className={`block mb-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Degree*
              </label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
            
            <div>
              <label className={`block mb-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Experience* (years)
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
          </div>
          
          {/* More Information */}
          <div className="space-y-4">
            <div>
              <label className={`block mb-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                About*
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                required
                rows="3"
                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              ></textarea>
            </div>
            
            <div>
              <label className={`block mb-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Consultation Fees* (₹)
              </label>
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
            
            <div>
              <label className={`block mb-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Profile Image*
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                required
                accept="image/*"
                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
            
            <div>
              <label className={`block mb-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Address*
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  name="address.street"
                  placeholder="Street"
                  value={formData.address.street}
                  onChange={handleChange}
                  required
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
                <input
                  type="text"
                  name="address.city"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={handleChange}
                  required
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="address.state"
                    placeholder="State"
                    value={formData.address.state}
                    onChange={handleChange}
                    required
                    className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  />
                  <input
                    type="text"
                    name="address.zipCode"
                    placeholder="Zip Code"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    required
                    className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  />
                </div>
                <input
                  type="text"
                  name="address.country"
                  placeholder="Country"
                  value={formData.address.country}
                  onChange={handleChange}
                  required
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded font-medium transition-colors ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {loading ? 'Adding Doctor...' : 'Add Doctor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor; 