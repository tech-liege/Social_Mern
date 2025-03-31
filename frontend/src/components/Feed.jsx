import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/api';
import Post from './Posts/Post';
import './Posts/CreatePost';
import CreatePost from './Posts/CreatePost';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
        alert('Error fetching posts');
      }
    };
    getPosts();
  }, []);

  return (
    <>
      <CreatePost />
      <h1>Feed</h1>
      <div>
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Feed;
