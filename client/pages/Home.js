import React from 'react';

import Button from '../components/Button';
import heroImg from '../assets/hero-image.jpg';
import homeImg1 from '../assets/home-img-1.jpg';
import homeImg2 from '../assets/home-img-2.jpg';
import homeImg3 from '../assets/home-img-3.jpg';

const Home = () => (
  <React.Fragment>
    <div className='flex flex-col'>
      <div className='relative text-left bg-gray-300 m-auto mt-10'>
        <img src={heroImg} alt='Create your own book!' className='w-full' />
      </div>

      <div className='bg-yellow-400 m-auto mt-16 p-4 rounded-xl'>
        <div className='flex '>
          <img
            src={homeImg1}
            alt='img1'
            className='m-3 w-24 shadow-lg rounded
            transition ease-in-out 
            transform hover:scale-105'
            style={{ backgroundSize: '100% 100%' }}
          />
          <img
            src={homeImg2}
            alt='img2'
            className='m-3 w-24 shadow-lg rounded
            transition ease-in-out 
            transform hover:scale-105'
            style={{ backgroundSize: '100% 100%' }}
          />
          <img
            src={homeImg3}
            alt='img3'
            className='m-3 w-24 shadow-lg rounded
            transition ease-in-out 
            transform hover:scale-105'
            style={{ backgroundSize: '100% 100%' }}
          />
        </div>

        <Button
        // change to /auth when BookData DB feature complete
          to='/form'
          styles='mt-6 p-3 w-48 shadow-lg
          transition ease-in-out 
          bg-white text-blue-500 
          hover:bg-blue-500 hover:text-white
          active:bg-blue-600
          transform active:scale-95'
        >
          Start Your Book!
        </Button>
      </div>
    </div>
  </React.Fragment>
);

export default Home;
