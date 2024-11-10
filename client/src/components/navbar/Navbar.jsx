import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import UserDropdown from './UserDropdown';
import { setAuth } from '../../redux/features/authentication/authSlice';
import { setAdmin } from '../../redux/features/isAdmin/adminSlice';
import axios from 'axios';

const Navbar = () => {
  const {isAdmin} = useSelector((state) => state.userProfile);
  const isadmin = useSelector((state) => state.admin.isadmin);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logOut = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        dispatch(setAuth(false));
        dispatch(setAdmin(false));
        navigate('/')
      }
      else{
        console.log(response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out.");
    }
  }

    const handleAdminLogin = (e) => {
        e.preventDefault();
        dispatch(setAdmin(true));
        navigate('/login')
    }

    const handleStudentLogin = (e) => {
      e.preventDefault();
      dispatch(setAdmin(false));
      console.log(isAdmin);
  }

  const toCreateBlog = () => {
    navigate('/admin/create-blog');
  }

  const toCreateEvent = () => {
    navigate('/admin/create-event');
  }


  return (
    <section className='sticky top-0 z-999 m-4'>
      <div className="containe w-full flex">
        <div className="flex flex-col p-5 md:flex-row md:items-center md:justify-between w-full">
        <div className="flex flex-row items-center justify-between md:justify-start w-full">
          <NavLink
            to="#"
            style={{ fontSize: '1.5rem' }} // Adjust the size as needed
            className="font-bold tracking-tighter text-cyan-600 transition duration-500 ease-in-out md:pr-8"
          >
            Aura Tracker
          </NavLink>

          <div className="flex-grow"></div> {/* This empty div will push the button to the right */}

          {!isAuthenticated && (!isadmin) && (
            <ul className="sm:text-center list-none md:inline-flex md:items-center space-y-2 md:space-y-0">
              <li>
                <button
                  onClick={handleAdminLogin}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Login as Admin
                </button>
              </li>
            </ul>
          )}

        {!isAuthenticated && (isadmin) && (
            <ul className="sm:text-center list-none md:inline-flex md:items-center space-y-2 md:space-y-0">
              <li>
                <button
                  onClick={handleStudentLogin}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Login as Student
                </button>
              </li>
            </ul>
          )}

          {isAuthenticated && (
            <button
              className="rounded-lg focus:outline-none md:hidden"
              onClick={() => setOpen(!open)}
            >
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
          )}
        </div>

          {isAuthenticated && (<nav className={`${open ? 'flex' : 'hidden'} grow flex-col md:flex md:flex-row md:justify-end`}>
            <ul className="sm:text-center list-none space-y-2 md:inline-flex md:items-center md:space-y-0">
              <li className={`${(isAdmin)?"hidden":""}`}>
                <NavLink
                  to={'/home'}
                  className={({isActive}) => `md:border-b-2 
                  px-2 py-6 text-sm leading-[22px]
                   text-gray-500 hover:border-cyan-600 hover:text-cyan-500
                   md:px-3 md:px-6
                   ${isActive?"border-cyan-600 text-cyan-600":"border-transparent"}
                   `}
                >
                  Home
                </NavLink>
              </li>
              <li className={`${(isAdmin)?"hidden":""}`}>
                <NavLink
                  to={'/dashboard'}
                  className={({isActive}) => `md:border-b-2 
                   px-2 py-6 text-sm leading-[22px]
                    text-gray-500 hover:border-cyan-600 hover:text-cyan-500
                    md:px-3 md:px-6
                    ${isActive?"border-cyan-600 text-cyan-600":"border-transparent"}
                    `}
                >
                  Dashboard
                </NavLink>
              </li>
              <li className={`${(isAdmin)?"hidden":""}`}>
                <NavLink
                  to={'/events'}
                  className={({isActive}) => `md:border-b-2 
                  px-2 py-6 text-sm leading-[22px]
                   text-gray-500 hover:border-cyan-600 hover:text-cyan-500
                   md:px-3 md:px-6
                   ${isActive?"border-cyan-600 text-cyan-600":"border-transparent"}
                   `}
                >
                  Events
                </NavLink>
              </li>
              <li className={`${(isAdmin)?"hidden":""}`}>
                <NavLink
                  to={'/leaderboard'}
                  className={({isActive}) => `md:border-b-2 
                  px-2 py-6 text-sm leading-[22px]
                   text-gray-500 hover:border-cyan-600 hover:text-cyan-500
                   md:px-3 md:px-6
                   ${isActive?"border-cyan-600 text-cyan-600":"border-transparent"}
                   `}
                >
                  Leaderboard
                </NavLink>
              </li>
                {/* admin view */}
              <li className={`${(isAdmin)?"":"hidden"}`}>
                  <button
                    onClick={toCreateEvent}
                    className={`hover:md:border-b-2
                                px-2 py-6 text-sm leading-[22px]
                                text-gray-500 hover:border-cyan-600 hover:text-cyan-500
                                md:px-3 md:px-6
                              `}
                  >
                    Create Event
                  </button>
              </li>
               
              <li className={`${(isAdmin)?"":"hidden"}`}>
                  <button
                    onClick={toCreateBlog}
                    className={`hover:md:border-b-2
                                px-2 py-6 text-sm leading-[22px]
                                text-gray-500 hover:border-cyan-600 hover:text-cyan-500
                                md:px-3 md:px-6
                              `}
                  >
                    Create Blog
                  </button>
              </li>
              {/* leaderboard's path yet to set */}
              <li className={`${(isAdmin)?"":"hidden"}`}>
                  <NavLink
                    to={'/leaderboard'}
                    className={`hover:md:border-b-2
                                px-2 py-6 text-sm leading-[22px]
                                text-gray-500 hover:border-cyan-600 hover:text-cyan-500
                                md:px-3 md:px-6
                              `}
                  >
                    Leaderboard
                  </NavLink>
              </li>
              {isAuthenticated && (
                <>
                  <li className={`${isAdmin ? "" : ""}`}>
                  <NavLink to={'/notifications'} className="px-3 py-6 sm:pl-4 md:m-12 text-gray-500 hover:text-cyan-500 relative">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-5-5.917V5a2 2 0 10-4 0v.083A6.002 6.002 0 004 11v3.159c0 .538-.214 1.055-.595 1.437L2 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      ></path>
                    </svg>
                  </NavLink>
                </li>
                </>
              )}
            </ul>
            <UserDropdown />
              
          </nav>)}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
