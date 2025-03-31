import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
// import { getCurrentUser } from '../../services/api';

import './Navbar.css';

export default function Nav() {
  return (
    <nav className='nav'>
      {/* Logo, active state, responsiveness, Hamburger menu */}
      <ul className='nav-list'>
        <li className='nav-item'>
          <Link to='/feed' className='nav-link'>
            Feed
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/explore' className='nav-link'>
            Explore
          </Link>
        </li>
        {/* {currentUser ? (
          <li className='nav-item'>
            <Link to={`/user/${currentUser._id}`} className='nav-link'>
              Profile
            </Link>
          </li>
        ) : ( */}
        <li className='nav-item'>
          <Link to='/login' className='nav-link'>
            Login
          </Link>
        </li>
        {/* )}
        {currentUser ? (
          <li className='nav-item'>
            <span className='nav-link' onClick={logout}>
              Logout
            </span>
          </li>
        ) : ( */}
        <li className='nav-item'>
          <Link to='/register' className='nav-link'>
            Register
          </Link>
        </li>
        {/* )} */}
      </ul>
    </nav>
  );
}
