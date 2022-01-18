import React, { useContext } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { AuthContext } from '../context/AuthContext';

import './Profile.css';

const Profile = () => {
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      <div className='profile_container'>
        <div className='profile_left'>
          <h2>My Account</h2>
          <h3>Julia Kang</h3>
          {/* {auth.isLoggedIn && ( */}
          <Button auth onClick={auth.logout}>
            Logout
          </Button>
          {/* )} */}
        </div>

        <div className='profile_right'>
          <Card className='profile_card'>
            <div className='profile_list_title'>Your Order</div>
            <ul className='profile_list_wrapper'>
              <li className='profile_list_item'>The Adventures of Olivia</li>
              <li className='profile_list_item'>The Adventures of Olivia</li>
              <li className='profile_list_item'>The Adventures of Olivia</li>
            </ul>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
