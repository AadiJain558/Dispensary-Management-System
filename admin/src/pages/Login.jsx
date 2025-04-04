import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets.js'
import { AdminContext } from '../context/AdminContext.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Login = () => {
    const [loginType, setLoginType] = useState('Admin')
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const {setAtoken, backendurl} = useContext(AdminContext)
    const navigate = useNavigate()

    // Check system preference for dark mode
    useEffect(() => {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        setDarkMode(isDarkMode)
    }, [])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleLoginTypeChange = (type) => {
        setLoginType(type)
        setFormData({email: '', password: ''})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (loginType === 'Admin') {
                // Admin login
                const response = await axios.post(`${backendurl}/api/admin/admin-login`, formData)
                if (response.data.token) {
                    setAtoken(response.data.token)
                    localStorage.setItem('adminToken', response.data.token)
                    toast.success('Admin login successful')
                    navigate('/dashboard')
                }
            } else {
                // Doctor login logic
                const response = await axios.post(`${backendurl}/api/admin/doctor-login`, formData)
                if (response.data.token) {
                    setAtoken(response.data.token)
                    localStorage.setItem('doctorToken', response.data.token)
                    toast.success('Doctor login successful')
                    navigate('/doctor-dashboard')
                }
            }
        } catch (error) {
            console.error('Login error:', error)
            toast.error(error.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Left side - Branding Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-indigo-600 to-purple-700 text-white p-12 flex-col justify-between">
                <div>
                    <img src={assets.logo} alt="Prescripto" className="h-14" />
                    <h1 className="text-4xl font-bold mt-16 mb-4">Welcome to Prescripto Admin</h1>
                    <p className="text-lg opacity-90 max-w-md">Manage your medical practice with our secure, efficient administration platform.</p>
                </div>
                
                <div className="mt-auto">
                    <div className="flex gap-4 mb-8">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                <path d="M3 10h18"></path><path d="M9 16H7"></path><path d="M13 16h-2"></path><path d="M17 16h-2"></path>
                            </svg>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                <path d="M9 2h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"></path><path d="M12 11h4"></path>
                                <path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path>
                            </svg>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m8 14-4 4V5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-1 1Z"></path>
                                <path d="M13.5 8.5v.01"></path><path d="M17.5 8.5v.01"></path><path d="M9.5 8.5v.01"></path>
                            </svg>
                        </div>
                    </div>
                    
                    <p className="opacity-70 text-sm">&copy; {new Date().getFullYear()} Prescripto Healthcare Solutions.</p>
                    <p className="opacity-70 text-xs mt-1">All rights reserved</p>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    {/* Dark Mode Toggle */}
                    <div className="absolute top-4 right-4">
                        <button 
                            onClick={toggleDarkMode} 
                            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {darkMode ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Logo - Only visible on small screens */}
                    <div className="block lg:hidden text-center mb-8">
                        <img src={assets.logo} alt="Prescripto" className="h-12 mx-auto" />
                        <h2 className={`text-2xl font-bold mt-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Sign In</h2>
                        <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Access your dashboard</p>
                    </div>

                    <div className={`rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
                        <div className={`${darkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-slate-50 border-b'} p-6`}>
                            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Sign In</h3>
                            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Access your dashboard</p>
                            
                            {/* Login Type Selector */}
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <button 
                                    onClick={() => handleLoginTypeChange('Admin')}
                                    className={`py-3 px-4 rounded-lg transition-all ${
                                        loginType === 'Admin'
                                            ? `${darkMode ? 'bg-indigo-600' : 'bg-indigo-600'} text-white font-medium shadow-md`
                                            : `${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`
                                    }`}
                                >
                                    <div className="flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>
                                        Admin
                                    </div>
                                </button>
                                <button 
                                    onClick={() => handleLoginTypeChange('Doctor')}
                                    className={`py-3 px-4 rounded-lg transition-all ${
                                        loginType === 'Doctor'
                                            ? `${darkMode ? 'bg-indigo-600' : 'bg-indigo-600'} text-white font-medium shadow-md`
                                            : `${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`
                                    }`}
                                >
                                    <div className="flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M8.5 4.5 5 7l2.5 2.5"></path><path d="M5 7h11a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-4"></path>
                                            <path d="M15.5 15.5 19 13l-3.5-2.5"></path><path d="M19 13H8a4 4 0 0 1-4-4v0a4 4 0 0 1 4-4h1"></path>
                                        </svg>
                                        Doctor
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="email">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"></path>
                                                <polyline points="15,9 18,9 18,11"></polyline><path d="m6 10 4 3 4-3"></path>
                                            </svg>
                                        </div>
                                        <input 
                                            id="email"
                                            name="email"
                                            type="email" 
                                            autoComplete="email"
                                            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                                darkMode 
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500/50 focus:border-indigo-500'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-500/50 focus:border-indigo-500'
                                            }`}
                                            placeholder="name@example.com" 
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="password">
                                            Password
                                        </label>
                                        <a href="#" className={`text-xs font-medium ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}>
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                            </svg>
                                        </div>
                                        <input 
                                            id="password"
                                            name="password"
                                            type="password" 
                                            autoComplete="current-password"
                                            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                                darkMode 
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500/50 focus:border-indigo-500'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-500/50 focus:border-indigo-500'
                                            }`}
                                            placeholder="••••••••" 
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <input 
                                        id="remember"
                                        name="remember"
                                        type="checkbox"
                                        className={`h-4 w-4 ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-indigo-500' : 'border-gray-300 focus:ring-indigo-500'} rounded`}
                                    />
                                    <label htmlFor="remember" className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Keep me signed in
                                    </label>
                                </div>
                                
                                <button
                                    type="submit"
                                    className={`w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 transition-all ${darkMode ? 'focus:ring-offset-gray-800' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Signing in...
                                        </span>
                                    ) : (
                                        `Sign in to Dashboard`
                                    )}
                                </button>
                            </form>
                            
                            <div className="flex items-center justify-center space-x-4 mt-6">
                                <div className={`w-full border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
                            </div>
                            
                            <div className="flex items-center justify-center space-x-4 mt-6 text-sm">
                                <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Terms of Service</a>
                                <span className={darkMode ? 'text-gray-600' : 'text-gray-400'}>•</span>
                                <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
