import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Dashboard = () => {
  const { darkMode } = useOutletContext();

  // Dummy data for the dashboard
  const stats = [
    {
      title: 'Total Doctors',
      value: '42',
      change: '+12%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: 'Total Patients',
      value: '2,845',
      change: '+18%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Appointments',
      value: '584',
      change: '+5%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Revenue',
      value: '$128,540',
      change: '-2%',
      isPositive: false,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const recentAppointments = [
    { id: 1, patient: 'Sarah Johnson', doctor: 'Dr. Mark Wilson', date: '2023-06-15', time: '09:30 AM', status: 'Completed' },
    { id: 2, patient: 'Michael Brown', doctor: 'Dr. Lisa Chen', date: '2023-06-15', time: '10:15 AM', status: 'Scheduled' },
    { id: 3, patient: 'Emily Davis', doctor: 'Dr. James Taylor', date: '2023-06-15', time: '11:00 AM', status: 'Cancelled' },
    { id: 4, patient: 'Robert Wilson', doctor: 'Dr. Emma Rodriguez', date: '2023-06-15', time: '01:30 PM', status: 'Completed' },
    { id: 5, patient: 'Jennifer Martinez', doctor: 'Dr. Lisa Chen', date: '2023-06-15', time: '02:45 PM', status: 'Scheduled' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Dashboard</h1>
        <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Welcome to your admin dashboard</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`flex items-center p-4 rounded-lg shadow-sm ${
              darkMode ? 'bg-[#1e293b]' : 'bg-white'
            }`}
          >
            <div className={`p-3 mr-4 rounded-full ${
              darkMode ? 'bg-indigo-600 bg-opacity-25' : 'bg-indigo-100'
            }`}>
              {stat.icon}
            </div>
            <div>
              <p className={`mb-2 text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.title}
              </p>
              <div className="flex items-center">
                <p className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-700'
                }`}>
                  {stat.value}
                </p>
                <span className={`ml-2 text-xs font-medium ${
                  stat.isPositive
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className={`rounded-lg shadow-sm ${darkMode ? 'bg-[#1e293b]' : 'bg-white'}`}>
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Appointments</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                <th className="p-2 text-left">Patient</th>
                <th className="p-2 text-left">Doctor</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Time</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recentAppointments.map((appointment) => (
                <tr key={appointment.id} className={`border-b last:border-b-0 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <td className={`p-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{appointment.patient}</td>
                  <td className={`p-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{appointment.doctor}</td>
                  <td className={`p-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{appointment.date}</td>
                  <td className={`p-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{appointment.time}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      appointment.status === 'Completed'
                        ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                        : appointment.status === 'Scheduled'
                        ? darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                        : darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <button className={`p-1 rounded-full hover:bg-opacity-20 ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className={`p-1 rounded-full hover:bg-opacity-20 ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 