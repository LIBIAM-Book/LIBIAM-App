import React from 'react';
import { Link } from 'react-router-dom';

import AuthLinks from './AuthLinks';

const Header = (props) => {
  let { styles } = props;

  return (
    <header
      className={`${styles} grid grid-cols-3 justify-items-center items-center border-b-2`}
    >
      <h1 className='col-start-2 text-2xl tracking-wide font-bold text-blue-600'>
        <Link to='/'>Libiam</Link>
      </h1>
      <div className='ml-auto mr-3'>
        <AuthLinks />
      </div>
    </header>
  );
};

export default Header;
