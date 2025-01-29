import React, { useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';

import './CreatePost.css';
import { createPosts } from '../../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [active, setActive] = useState(false);

  const handleChange = async e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { data } = await createPosts(formData);
      setActive(false);
      alert(`Post created successfully.Id:${data._id}, Title: ${data.title}`);
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
      <LoadingOverlay active={active} spinner={<BounceLoader />} fadeSpeed='300'>
        <form className='register-form' onSubmit={handleSubmit}>
          <h1 className='text-align-center'>Create Post</h1>
          <input type='text' className='form-control m-2' placeholder='title' name='title' onChange={handleChange} />
          <input type='content' className='form-control m-2' placeholder='content' name='content' onChange={handleChange} />

          <button type='submit' className='btn btn-primary m-2' onClick={activateLoading()}>
            Create
          </button>
        </form>
      </LoadingOverlay>
    </div>
  );
}
