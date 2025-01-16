// import { useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import component
import Login from './Components/Auth/Login.jsx';
import Register from './Components/Auth/Register.jsx';
// import ResetPassword from './Components/Auth/Reset_Password.jsx';
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
            <Route path='/feed' element={<Feed />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/post' element={<Posts />} />
            <Route path='/user/:userId' element={<UserProfile />} />
            <Route path='/login' element={<Login />} /> {/* route completed */}
            <Route path='/register' element={<Register />} /> {/* route completed */}
            {/* <Route path='/resetPassword' element={<ResetPassword />} /> */}
            <Route path='/create' element={<CreatePost />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
