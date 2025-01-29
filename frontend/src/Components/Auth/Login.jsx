import React, { useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';

import './Login.css';
import { login } from '../../services/api';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [active, setActive] = useState(false);

  const handleChange = async e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { data } = await login(formData);
      localStorage.setItem('token', data.token);
      setActive(false);
      alert('User logged-in successfully');
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  const activateLoading = () => {
    try {
      setActive(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <LoadingOverlay active={active} spinner={<BounceLoader />}>
        <form className='login-form' onSubmit={handleSubmit}>
          <h1 className='text-align-center'>Login</h1>
          <input type='email' className='form-control m-2' placeholder='Email' name='email' onChange={handleChange} />
          <input type='password' className='form-control m-2' placeholder='Password' name='password' onChange={handleChange} />

          <button type='submit' className='btn btn-primary m-2' onClick={activateLoading()}>
            Login
          </button>
          <p className='text-muted'>
            Forgot Password?{' '}
            <Link className='link-primary' to='/reset-password'>
              Reset Password
            </Link>
          </p>
          <p className='text-muted'>
            Don{`'`}t have an account?{' '}
            <Link className='link-primary' to='/register'>
              Register
            </Link>
          </p>
        </form>
      </LoadingOverlay>
    </div>
  );
}
