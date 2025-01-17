import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
const API = axios.create({ baseURL: 'http://localhost:3000/api' });

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const register = userData => {
  try {
    API.post('/user/register', userData);
  } catch (err) {
    console.log('Error', err);
  }
};

export const login = async userData => {
  try {
    API.post('/user/login', userData);
  } catch (err) {
    console.log('Error', err);
  }
};

export const getPosts = async () => {
  try {
    API.get('/post', { headers: getAuthHeader });
  } catch (err) {
    console.log('Error', err);
  }
};

export const getOnePosts = async () => {
  try {
    API.get(`/post/'`, { headers: getAuthHeader });
  } catch (err) {
    console.log('Error', err);
  }
};

export const createPosts = async postData => {
  try {
    API.get('/post/create', postData);
  } catch (err) {
    console.log('Error', err);
  }
};

// **Other routes** //
// follow
// unfollow
// getCurrentUser
// getAllOtherUser
// getUser
// *****************//
// getOnePost
// getUserPost
// like
// unlike
// deletePost
// updatePost
// createComment
// deleteComment
// updateComment