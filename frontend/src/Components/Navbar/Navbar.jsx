import React from 'react';

import { Link } from 'react-router-dom';

import './Navbar.css';

export default function Nav() {
  // Component logic and state can be added here

  return (
    <nav className='nav'>
      <ul className='nav-list'>
        <li className='nav-item'>
          <Link to='/create' className='nav-link'>
            CreatePost
          </Link>
        </li>
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
        <li className='nav-item'>
          <Link to='/user/:userId' className='nav-link'>
            Profile
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/login' className='nav-link'>
            Login
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/register' className='nav-link'>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}
