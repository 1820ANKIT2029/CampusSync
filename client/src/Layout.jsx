import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'

function Layout() {
  return (
    <>
      <div className="overflow-hidden w-full min-h-screen p-4 bg-blue-100 transition-color">
        <div className="max-w-screen-xl mx-auto ">
          <Navbar/>
          <Outlet/>
          <div className="w-full h-px bg-gray-400 my-6" />
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default Layout
