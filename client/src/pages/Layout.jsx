import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

function Layout() {
  return (
    <div className="overflow-hidden w-full min-h-screen flex flex-col bg-blue-100 transition-color">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col flex-grow">
        <Navbar />
        
        {/* Main Content */}
        <div className="flex-grow p-4">
          <Outlet />
        </div>
        
        {/* Divider Line */}
        <div className="w-full h-px bg-gray-400 my-6" />
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
