import React, { useState, useEffect } from 'react';

import './UserProfile.css';
import { getAllUsers, getCurrentUser, follow, unfollow } from '../../services/api';
import { Link } from 'react-router-dom';

export default function UserProfile() {
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await getAllUsers();
        const currentUserResponse = await getCurrentUser();

        setUser(usersResponse.data);
        setCurrentUser(currentUserResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const resetUsers = async () => {
    try {
      const usersResponse = await getAllUsers();
      setUser(usersResponse.data);
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
    <span className='m-auto'>Loading..</span>
  ) : (
    <div className='container'>
      <h1>UserProfile</h1>
      <div className='userprofile'>
        <Link to={`/user/${user._id}`}>
          <span>{user.username}</span>
          <span>{user.email}</span>
          <span>{user.following.length}</span>
          <span>{user.followers.length}</span>
        </Link>
      </div>
      {user !== currentUser ? (
        user.following?.includes(currentUser?._id) ? (
          <button className='btn btn-primary' onClick={handleUnfollow(user._id)}>
            Unfollow
          </button>
        ) : (
          <button className='btn btn-primary' onClick={handleFollow(user._id)}>
            Follow
          </button>
        )
      ) : (
        <Link to=''>
          <button className='btn btn-primary'>Edit Proifle</button>
        </Link>
      )}
      <div className='tabs'>
        <div className='tab-item'>Following</div>
        <div className='tabitem'>Followers</div>
      </div>
    </div>
  );
}
