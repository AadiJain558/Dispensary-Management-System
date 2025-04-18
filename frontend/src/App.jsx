import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Register from './pages/Register'
import Contact from './pages/Contact'
import MyProfile from './pages/Myprofile'
import MyAppointments from './pages/Myappointment'
import Appointment from './pages/Appointment'
import Home from './pages/Home'
import ThemeProvider from './components/ThemeProvider'

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/doctors/:specialization' element={<Doctors />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='my-profile' element={<MyProfile />} />
            <Route path='my-appointments' element={<MyAppointments />} />
            <Route path='/appointment/:id' element={<Appointment />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
