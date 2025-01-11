import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Footer() {
  return (
    <footer className="bg-blue-100 text-cyan-500 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Description */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold">CampusSync</h2>
          <p className="text-gray-800 mt-2 max-w-sm">
            Enhancing campus life with easy access to events, study groups, and activities.
          </p>
        </div>
        
        {/* Links */}
        <div className="flex flex-col md:flex-row md:space-x-8 text-center md:text-left mb-6 md:mb-0">
          <a href="#about" className="text-cyan-400 hover:text-cyan-500 transition duration-200">
            About Us
          </a>
          <a href="#features" className="text-cyan-400 hover:text-cyan-500 transition duration-200">
            Features
          </a>
          <a href="#contact" className="text-cyan-400 hover:text-cyan-500 transition duration-200">
            Contact
          </a>
          <a href="#support" className="text-cyan-400 hover:text-cyan-500 transition duration-200">
            Support
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-blue-300 mt-6 text-sm">
        &copy; {new Date().getFullYear()} CampusSync. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
