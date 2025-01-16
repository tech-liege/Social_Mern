import React, { useState } from 'react';

import './Register.css';
import { register } from '../../services/api';
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = async e => {
    console.log('name:', e.target.name);
    console.log('value:', e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log('formData', formData);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await register(formData);
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  return (
    <div>
      <form className='register-form' onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input type='text' className='register-input' placeholder='Username' name='username' onChange={handleChange} />
        <input type='email' className='register-input' placeholder='Email' name='email' onChange={handleChange} />
        <input type='password' className='register-input' placeholder='Password' name='password' onChange={handleChange} />
        <input type='password' className='register-input' placeholder='Confirm Password' name='confirmPassword' onChange={handleChange} />

        <button type='submit' className='register-button'>
          Register
        </button>
        <p className='text-muted'>
          Already have an account?{' '}
          <Link className='register-link' to='/login'>
            Login
          </Link>
        </p>
        <p className='text-muted'>
          Forgot Password?{' '}
          <Link className='register-link' to='/reset-password'>
            Reset Password
          </Link>
        </p>
      </form>
    </div>
  );
}
