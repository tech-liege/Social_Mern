import React from 'react';

import { Link } from 'react-router-dom';

import './Navbar.css';

export default function Nav() {
  // Component logic and state can be added here

  const logout = async () => {
    localStorage.removeItem('token');
    alert('User logged-out successfully');
    window.location.pathname = '/'; //.reload();
  };

  return (
    <nav className='nav'>
      {/* Logo, active state, responsiveness, Hamburger menu */}
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
          <span className='nav-link' onClick={logout}>
            Logout
          </span>
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
