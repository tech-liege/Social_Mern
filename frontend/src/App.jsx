import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './components/Explore/Explore';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar/Navbar';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar/Sidebar';

import './App.css';

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <div className='row'>
            <div className='col-1'>
              <Sidebar />
            </div>
            <div className='col-11'>
              <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/user/:userId' element={<UserProfile />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/feed' element={<Feed />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
