import React from 'react';

import Header from '../Header';
import Footer from '../Footer';

import './style.css'

const Layout = ({children}) => (
  <div className="main-content">
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </div>
)

export default Layout