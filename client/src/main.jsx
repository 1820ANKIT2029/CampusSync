import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.js';
import './index.css';

import Layout from './pages/Layout.jsx';
import Login from './components/login/login.jsx';
import Home from './components/home/Home.jsx';
import Signup from './components/signup/Signup.jsx';
import EventsPage from './components/eventsSection/EventsPage.jsx';
import Event from './components/eventsSection/Event.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Profile from './components/profile/Profile.jsx';
import Hero from './components/entryPage/Hero.jsx';
import Admin from './pages/Admin.jsx';
import AdminProfile from './components/admin/admin-profile/AdminProfile.jsx';
import CreateEvent from './components/admin/event/CreateEvent.jsx';
import CreateBlog from './components/admin/blog/CreateBlog.jsx';
import EventDetails from './components/admin/event/EventDetails.jsx';

import ProtectedRoute from './auth/ProtectedRoute.jsx';
import IfLogin from './auth/iflogin.jsx';
import EnsureAdmin from './auth/ensureAdmin.jsx';
import LeaderBoard from './components/leaderboard/LeaderBoard.jsx';
import NotificationSection from './components/notifications/NotificationSection.jsx';
import TaskPage from './components/tasks/TaskPage.jsx';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path="/" element={<IfLogin><Hero /></IfLogin>} />
      <Route path="/login" element={<IfLogin><Login /></IfLogin>} />
      <Route path="/signup" element={<IfLogin><Signup /></IfLogin>} />

      {/* user Routes */}
      <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
      <Route path="/events" element={<ProtectedRoute> <EventsPage /> </ProtectedRoute>} />
      <Route path="/event/:eventId" element={<ProtectedRoute> <Event /> </ProtectedRoute>} />
      <Route path='/notifications' element={<ProtectedRoute> <NotificationSection/> </ProtectedRoute>}/>

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute><EnsureAdmin><Admin /></EnsureAdmin></ProtectedRoute>}>
        <Route path="" element={<AdminProfile />} />
        <Route path="create-event" element={<CreateEvent />} />
        <Route path="create-blog" element={<CreateBlog />} />
        <Route path="event/:eventId" element={<EventDetails />} />
        <Route path='notifications' element={<NotificationSection/>}/>
      </Route>

      {/* testing */}
      <Route path="events/event" element={<EventDetails />} />
      <Route path='/leaderboard' element={<ProtectedRoute> <LeaderBoard/> </ProtectedRoute>} />
      <Route path='/tasks' element={<ProtectedRoute> <TaskPage/> </ProtectedRoute>} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
