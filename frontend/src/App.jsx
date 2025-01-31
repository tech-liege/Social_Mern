import { useState, useEffect } from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { isAPIActive } from './services/api.jsx';

// Import components//
import InternalServerError from './Components/InternalServerError/InternalServerError.jsx';
import Login from './Components/Auth/Login.jsx';
import Register from './Components/Auth/Register.jsx';
// import ResetPassword from './Components/Auth/Reset_Password.jsx';
import Explore from './Components/Explore/Explore.jsx';
import Feed from './Components/Feed/Feed.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import Posts from './Components/Posts/Posts.jsx';
import CreatePost from './Components/Posts/CreatePost.jsx';
import UserProfile from './Components/UserProfile/UserProfile.jsx';

function App() {
  // Check if API is active
  const [apiStatus, setAPIStatus] = useState(isAPIActive() ? true : false);

  // Check API status every 2 min
  useEffect(() => {
    const interval = setInterval(() => {
      setAPIStatus(isAPIActive() ? true : false);
      console.log('API status:', apiStatus);
    }, 120000);

    return () => clearInterval(interval);
  }, [setAPIStatus, apiStatus]);

  if (apiStatus) {
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
            </div>
          </div>
        </Router>
      </>
    );
  } else {
    return (
      <>
        <Router>
          <Routes>
            <Route path='*' element={<InternalServerError />} /> {/* route completed */}
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
