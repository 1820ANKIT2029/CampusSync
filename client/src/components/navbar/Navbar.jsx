import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserDropdown from './UserDropdown';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className=' m-4'>
      <div className="containe w-full">
        <div className="flex flex-col p-5 md:flex-row md:items-center md:justify-between w-full">
          <div className="flex flex-row items-center justify-between md:justify-start">
          <NavLink
            href="#"
            style={{ fontSize: '1.5rem' }} // Adjust the size as needed
            className="font-bold tracking-tighter text-cyan-600 transition duration-500 ease-in-out md:pr-8"
            >
            Aura Tracker
        </NavLink>

            <button className="rounded-lg focus:outline-none md:hidden" onClick={() => setOpen(!open)}>
              <svg fill="currentColor" viewBox="0 0 20 20" className="size-8">
                <path
                  className={!open ? 'block' : 'hidden'}
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
                <path
                  className={open ? 'block' : 'hidden'}
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <nav className={`${open ? 'flex' : 'hidden'} grow flex-col md:flex md:flex-row md:justify-end`}>
            <ul className="list-none space-y-2 md:inline-flex md:items-center md:space-y-0">
              <li>
                <NavLink
                  to={'/home'}
                  className={({isActive}) => `border-b-2 
                  px-2 py-6 text-sm leading-[22px]
                   text-gray-500 hover:border-cyan-600 hover:text-cyan-500
                   md:px-3 md:px-6
                   ${isActive?"border-cyan-600 text-cyan-600":"border-transparent"}
                   `}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard'}
                  className={({isActive}) => `border-b-2 
                   px-2 py-6 text-sm leading-[22px]
                    text-gray-500 hover:border-cyan-600 hover:text-cyan-500
                    md:px-3 md:px-6
                    ${isActive?"border-cyan-600 text-cyan-600":"border-transparent"}
                    `}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/events'}
                  className={({isActive}) => `border-b-2 
                  px-2 py-6 text-sm leading-[22px]
                   text-gray-500 hover:border-cyan-600 hover:text-cyan-500
                   md:px-3 md:px-6
                   ${isActive?"border-cyan-600 text-cyan-600":"border-transparent"}
                   `}
                >
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/events/event'}
                  className={({isActive}) => `border-b-2 
                  px-2 py-6 text-sm leading-[22px]
                   text-gray-500 hover:border-cyan-600 hover:text-cyan-500
                   md:px-3 md:px-6
                   ${isActive?"border-cyan-600 text-cyan-600":"border-transparent"}
                   `}
                >
                  Leaderboard
                </NavLink>
              </li>
            </ul>
            <UserDropdown/>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
