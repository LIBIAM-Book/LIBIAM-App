import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import UserBookList from '../components/UserBookList';
import { AuthContext } from '../context/AuthContext';
import useAuth from '../hooks/useAuth';

import './Profile.css';

const Profile = () => {
  const auth = useContext(AuthContext);
  const { setCred } = useAuth();
  const [userBooks, setUserBooks] = useState();

  useEffect(() => {
    const fetchUserBooks = () => {
      try {
        axios
          .get('/api/books')
          .then((res) => {
            console.log(res);
            setUserBooks(res.data);
          })
          .catch((err) => console.log(err));
      } catch (err) {}
    };

    fetchUserBooks();
    // Add dependency as user id when user db is complete
  }, []);

  return (
    <React.Fragment>
      <div className='profile_container'>
        <div className='profile_left'>
          <h2>My Account</h2>
          <h3>USER NAME</h3>
          {/* {auth.isLoggedIn && ( */}
          <Button auth onClick={() => setCred({})}>
            Logout
          </Button>
          {/* )} */}
        </div>

        <div className='profile_right'>
          <Button
            to='/form'
            styles='mt-6 p-3 w-48 shadow-lg
          transition ease-in-out 
          bg-white text-blue-500 
          hover:bg-blue-500 hover:text-white
          active:bg-blue-600
          transform active:scale-95'
          >
            Create a New Book!
          </Button>
          <Card className='profile_card'>
            <div className='profile_list_title'>Your Books</div>
            <UserBookList listItems={userBooks} />
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
