import React, { useState, useEffect } from 'react';
import LoadingOverlay from 'react-loading-overlay.jsx';
import BounceLoader from 'react-spinners/BounceLoader';

import './Explore.css';
import { getAllUsers, getCurrentUser, follow, unfollow } from '../../services/api';
import { Link } from 'react-router-dom';

export default function Explore() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await getAllUsers();
        const currentUserResponse = await getCurrentUser();

        setUsers(usersResponse.data);
        setCurrentUser(currentUserResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const resetUsers = async () => {
    try {
      const usersResponse = await getAllUsers();
      setUsers(usersResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async userId => {
    try {
      await unfollow(userId);
      resetUsers();
    } catch (error) {
      console.log('Unfollow Error: ', error);
    }
  };

  const handleFollow = async userId => {
    try {
      await follow(userId);
      resetUsers();
    } catch (error) {
      console.log('Follow Error: ', error);
    }
  };

  return isLoading ? (
    <LoadingOverlay active={true} spinner={<BounceLoader />} className='d-block h-100 w-100'></LoadingOverlay>
  ) : (
    <div className='container'>
      <h1>Explore</h1>
      <ul className='user-list'>
        {users.map(user => (
          <li className='user-list-item' key={user._id}>
            <Link to={`/user/${user._id}`}>
              <span>{user.username}</span>
              <span>{user.email}</span>
              <span>{user.following}</span>
              <span>{user.followers}</span>
            </Link>
            {user.following?.includes(currentUser?._id) ? (
              <button className='btn btn-primary' onClick={handleUnfollow(user._id)}>
                Unfollow
              </button>
            ) : (
              <button className='btn btn-primary' onClick={handleFollow(user._id)}>
                Follow
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
