import React, { useState } from 'react';
import { createPost } from '../../services/api';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    description: '',
    image: '',
    video: '',
    location: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await createPost(formData);
      setFormData({ title: '', content: '', description: '' });
      alert('Post created successfully');
    } catch (err) {
      console.error(err);
      alert('Error creating post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name='title' placeholder='Title' onChange={handleChange} />
      <input name='description' placeholder='Description (optional)' onChange={handleChange} />
      <textarea name='content' placeholder="What's on your mind?" onChange={handleChange} />
      <button type='submit'>Create Post</button>
      <small>You must be logged in to create a post.</small>
      {/* <small>
        Image: <input type="file" name="image" />
        Video: <input type="file" name="video" />
      </small> */}
    </form>
  );
};

export default CreatePost;
