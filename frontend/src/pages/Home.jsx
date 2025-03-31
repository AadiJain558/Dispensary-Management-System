import React from 'react'
import Header from '../components/Header'
import Specialities from '../components/Specialities'
import TopDoctors from '../components/TopDoctors'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="pt-16">
      <Header />
      <Specialities />
      <TopDoctors />
      <Footer />
    </div>
  )
}

export default Home
