import React, { useState, useEffect } from 'react';

import './Feed.css';
import { getAllposts, getCurrentUser, follow, unfollow } from '../../services/api';
import { Link } from 'react-router-dom';

export default function Feed() {
  const [posts, setposts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await getAllposts();
        const currentUserResponse = await getCurrentUser();

        setposts(postsResponse.data);
        setCurrentUser(currentUserResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUnfollow = async postId => {
    try {
      await unfollow(postId);
    } catch (error) {
      console.log('Unfollow Error: ', error);
    }
  };

  const handleFollow = async postId => {
    try {
      await follow(postId);
    } catch (error) {
      console.log('Follow Error: ', error);
    }
  };

  return isLoading ? (
    <span className='m-auto'>Loading..</span>
  ) : (
    <div className='container'>
      <h1>Feed</h1>
      <ul className='post-list'>
        {posts.map(post => (
          <li className='post-list-item' key={post._id}>
            <Link to={`/post/${post._id}`}>
              <span>{post.title}</span>
              <span>{post.content}</span>
            </Link>
            {post.likes?.includes(currentUser?._id) ? (
              <button className='btn btn-primary' onClick={handleUnfollow(post._id)}>
                Unlike
              </button>
            ) : (
              <button className='btn btn-primary' onClick={handleFollow(post._id)}>
                Like
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
