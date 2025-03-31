import React from 'react';

// import { Link } from 'react-router-dom';
// import { getCurrentUser } from '../../services/api';

import './Sidebar.css';

export default function Sidebar() {
  return (
    <nav className='sidebar'>
      {/* Logo, active state, responsiveness, Hamburger menu */}
      <ul className='sidebar-list'>
        <li className='sidebar-item'>
          <span className='bi bi-icon'>o</span>
        </li>
      </ul>
    </nav>
  );
}
