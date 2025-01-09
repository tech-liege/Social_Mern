// import { useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import component
import Home from './Components/Home/Home.jsx';
import Profile from './Components/Profile/Profile.jsx';
import Login from './Components/Auth/Login.jsx';
import Register from './Components/Auth/Register.jsx';
import Explore from './Components/Explore/Explore.jsx';
import Feed from './Components/Feed/Feed.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Posts from './Components/Posts/Posts.jsx';
import CreatePost from './Components/Posts/CreatePost.jsx';
import UserProfile from './Components/UserProfile/UserProfile.jsx';

function App() {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/user/:userId' element={<UserProfile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<CreatePost />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
