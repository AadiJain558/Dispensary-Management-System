import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Register from './pages/Register'
import Contact from './pages/Contact'
import MyProfile from './pages/Myprofile'
import MyAppointments from './pages/Myappointment'
import Appointment from './pages/Appointment'
import Home from './pages/Home'
const App = () => {
  return (
    <div>
      <Navbar />
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
    </div>
  )
}

export default App
