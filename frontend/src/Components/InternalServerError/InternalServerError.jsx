import React from 'react';

import { Link } from 'react-router-dom';

import './InternalServerError.css';

export default function InternalServerError() {
  // Component logic and state can be added here
  return (
    <div>
      <nav className='nav'>
        {/* Logo, active state, responsiveness, Hamburger menu */}
        <ul className='nav-list'>
          <li className='nav-item nav-link'>CreatePost</li>
          <li className='nav-item nav-link'>Feed</li>
          <li className='nav-item nav-link'>Explore</li>
          <li className='nav-item nav-link'>Profile</li>
          <li className='nav-item nav-link'>Login</li>
          <li className='nav-item nav-link'>Register</li>
        </ul>
      </nav>
      <div className='container center'>
        <div className='ISE'>
          <div className='divider'>
            <h1 className=''>Internal Server Error</h1>
          </div>
          <span className='text-muted'>
            Oops! Something went wrong.
            <Link to='/' className='btn btn-sm'>
              Refresh
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
