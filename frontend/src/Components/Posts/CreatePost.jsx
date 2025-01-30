import React, { useState } from 'react';

import './CreatePost.css';
import { createPosts } from '../../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleChange = async e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { data } = await createPosts(formData);
      alert(`Post created successfully.Id:${data._id}, Title: ${data.title}`);
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  return (
    <div className='container-md'>
      <form className='post-form' onSubmit={handleSubmit}>
        <h1 className='text-align-center'>Create Post</h1>
        <input type='text' className='form-control m-2' placeholder='title' name='title' onChange={handleChange} />
        <input type='content' className='form-control m-2' placeholder='content' name='content' onChange={handleChange} />

        <button type='submit' className='btn btn-primary m-2'>
          Create
        </button>
      </form>
    </div>
  );
}
