import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store.js';

import Layout from './Layout.jsx';
import './index.css';
import Login from './components/login/login.jsx';
import Home from './components/home/Home.jsx';
import Signup from './components/signup/Signup.jsx';
import EventsPage from './components/eventsSection/EventsPage.jsx';
import Event from './components/eventsSection/Event.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Profile from './components/profile/Profile.jsx';
import Hero from './components/entryPage/Hero.jsx';
import Admin from './components/admin/Admin.jsx';
import AdminProfile from './components/admin/admin-profile/AdminProfile.jsx';
import CreateEvent from './components/admin/event/CreateEvent.jsx';
import CreateBlog from './components/admin/blog/CreateBlog.jsx';
import EventDetails from './components/admin/event/EventDetails.jsx';

import ProtectedRoute from './auth/ProtectedRoute.jsx';
import EnsureAdmin from './auth/ensureAdmin.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
      <Route path="/events/event" element={<ProtectedRoute><Event /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute><EnsureAdmin><Admin /></EnsureAdmin></ProtectedRoute>}>
        <Route path="" element={<AdminProfile />} />
        <Route path="create-event" element={<CreateEvent />} />
        <Route path="create-blog" element={<CreateBlog />} />
        <Route path="event-details" element={<EventDetails />} />
      </Route>

    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
