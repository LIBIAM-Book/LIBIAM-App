import React, { useContext } from 'react';
import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import './AuthLinks.css';

const AuthLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      <ul className='nav__links_container'>
        {/* {auth.isLoggedIn && ( */}
        <li className='nav__profile_wrapper'>
          <NavLink to='/profile'>
            <CgProfile />
          </NavLink>
        </li>
        {/* )} */}
        {!auth.isLoggedIn && (
          <li className='nav__login_wrapper'>
            <NavLink className='nav__login' to='/auth'>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </React.Fragment>
  );
};

export default AuthLinks;
