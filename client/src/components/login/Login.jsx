import React from 'react';
import LoginCard from './LoginCard.jsx'
import Image from '../Image.jsx';

function Login() {
  return (
    <div className='flex flex-row-reverse mb-40'>
      <div className='w-full lg:w-1/2 lg:pr-32 lg:pt-20'>
        <LoginCard />
      </div>
      <div className='hidden lg:block lg:w-1/2 lg:pl-32 lg:pt-32'>
        <Image />
      </div>
    </div>
  );
}

export default Login;
