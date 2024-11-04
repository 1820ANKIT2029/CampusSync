import React from 'react';
import SignupCard from './SignupCard';
import Image from '../Image.jsx';

function Signup() {
  return (
    <div className='flex flex-row-reverse mb-40'>
      <div className='w-full lg:w-1/2 lg:pr-32 lg:pt-10'>
        <SignupCard />
      </div>
      <div className='hidden lg:block lg:w-1/2 lg:pl-32 lg:pt-32'>
        <Image />
      </div>
    </div>
  );
}

export default Signup;
