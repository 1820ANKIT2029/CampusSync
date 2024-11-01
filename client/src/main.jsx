import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'


import Layout from './Layout.jsx'
// import Home from './components/Home/Home.jsx'
// import About from './components/About/About.jsx'
// import Contact from './Contact/Contact.jsx'
// import User from './components/User/User.jsx'
// import Github, { githubInfoLoader } from './components/Github/Github.jsx'
import './index.css'
import Login from './components/login/login.jsx'
import Home from './components/Home.jsx'
import Signup from './components/signup/Signup.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route path="" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        {/* <Route path="about" element={<About/>} /> */}
        {/* <Route path="contact" element={<Contact/>} /> */}
        {/* <Route path="user/:userid" element={<User/>} /> */}
        {/* <Route
         loader={githubInfoLoader}
         path="github" 
         element={<Github/>} 
         /> */}
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
