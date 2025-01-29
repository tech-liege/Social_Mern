import React, { useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';

import './Register.css';
import { register } from '../../services/api';
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
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
      const { data } = await register(formData);
      setActive(false);
      alert(`User registered successfully.Id:${data._id}, Username: ${data.username}, Email:${data.email}, Password:${formData.password}`);
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
        <form className='register-form' onSubmit={handleSubmit}>
          <h1 className='text-align-center'>Register</h1>
          <input type='text' className='form-control m-2' placeholder='Username' name='username' onChange={handleChange} />
          <input type='email' className='form-control m-2' placeholder='Email' name='email' onChange={handleChange} />
          <input type='password' className='form-control m-2' placeholder='Password' name='password' onChange={handleChange} />
          {/* <input type='password' className='form-control' placeholder='Confirm Password' name='confirmPassword' onChange={handleChange} /> */}

          <button type='submit' className='btn btn-primary m-2' onClick={activateLoading()}>
            Register
          </button>
          <p className='text-muted'>
            Already have an account?{' '}
            <Link className='link-primary' to='/login'>
              Login
            </Link>
          </p>
        </form>
      </LoadingOverlay>
    </div>
  );
}
