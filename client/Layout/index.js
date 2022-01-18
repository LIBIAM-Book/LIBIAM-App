import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children }) => (
  <React.Fragment>
    <div className='background h-screen w-full text-center font-roboto box-border'>
      <Header styles='p-4 z-10 bg-white' />
      <main className='background p-4 pb-20'>{children}</main>
      <Footer styles='background fixed bottom-0 h-16 w-full z-10 bg-white ' />
    </div>
  </React.Fragment>
);

export default Layout;
