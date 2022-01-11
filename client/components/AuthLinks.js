import React, { useContext } from 'react';
import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import './AuthLinks.css';

const AuthLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      {auth.isLoggedIn && (
        <NavLink to='/profile'>
          <CgProfile />
        </NavLink>
      )}
      {!auth.isLoggedIn && (
        <div className='nav__login_container'>
          <NavLink className='nav__login' to='/auth'>
            Login
          </NavLink>
        </div>
      )}
    </React.Fragment>
  );
};

export default AuthLinks;
