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

export const follow = async () => {
  try {
    API.post('/user//follow/:userId', { headers: getAuthHeader() });
  } catch (err) {
    console.log('Error', err);
  }
};

export const unfollow = async () => {
  try {
    API.post('/user/unfollow/:userId', { headers: getAuthHeader() });
  } catch (err) {
    console.log('Error', err);
  }
};

export const getAllUsers = async () => {
  try {
    API.get('/user', { headers: getAuthHeader() });
  } catch (err) {
    console.log('Error', err);
  }
};

export const getCurrentUser = async () => {
  try {
    API.get('/user/profile', { headers: getAuthHeader() });
  } catch (err) {
    console.log('Error', err);
  }
};

export const getOneUser = async userId => {
  try {
    API.get(`/user/profile/${userId}`, { headers: getAuthHeader() });
  } catch (err) {
    console.log('Error', err);
  }
};

export const searchUserByUsername = async searchInput => {
  try {
    API.get(`/user/search/username`, searchInput, { headers: getAuthHeader() });
  } catch (err) {
    console.log('Error', err);
  }
};

export const searchUserByEmail = async searchInput => {
  try {
    API.get(`/user/search/email`, searchInput, { headers: getAuthHeader() });
  } catch (err) {
    console.log('Error', err);
  }
};

// *****************//

export const getPosts = async () => {
  try {
    API.get('/post', { headers: getAuthHeader });
  } catch (err) {
    console.log('Error', err);
  }
};

export const getOnePosts = async postId => {
  try {
    API.get(`/post/${postId}`, { headers: getAuthHeader });
  } catch (err) {
    console.log('Error', err);
  }
};

export const getUserPosts = async userId => {
  try {
    API.get(`/post/user/${userId}`, { headers: getAuthHeader });
  } catch (err) {
    console.log('Error', err);
  }
};

export const createPosts = async postData => {
  try {
    API.post('/post/create', postData);
  } catch (err) {
    console.log('Error', err);
  }
};

export const deletePost = async postId => {
  try {
    API.post(`/post/delete/${postId}`, { headers: getAuthHeader });
  } catch (err) {
    console.log('Error', err);
  }
};

export const updatePost = async (postId, PostData) => {
  try {
    API.post(`/post/update/${postId}`, PostData, { headers: getAuthHeader });
  } catch (err) {
    console.log('Error', err);
  }
};

export const likePost = async postId => {
  try {
    API.post(`/post/${postId}/like`, { headers: getAuthHeader });
  } catch (err) {
    console.log('Error', err);
  }
};

export const unlikePost = async postId => {
  try {
    API.post(`/post/${postId}/unlike`, { headers: getAuthHeader });
  } catch (err) {
    console.log('Error', err);
  }
};

export const sharePost = async postId => {
  try {
    API.post(`/post/${postId}/share`, { headers: getAuthHeader });
  } catch (err) {
    console.log('Error', err);
  }
};

export const unsharePost = async postId => {
  try {
    API.post(`/post/${postId}/unshare`, { headers: getAuthHeader });
  } catch (err) {
    console.log('Error', err);
  }
};

export const createComment = async (postId, commentData) => {
  try {
    API.post(`/post/${postId}/comment/create`, commentData, { headers: getAuthHeader });
  } catch (err) {
    console.log('Error', err);
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    API.post(`/post/${postId}/comment/${commentId}/delete`, { headers: getAuthHeader });
  } catch (err) {
    console.log('Error', err);
  }
};

export const updateComment = async (postId, commentId, commentData) => {
  try {
    API.post(`/post/${postId}/comment/${commentId}/update`, commentData, { headers: getAuthHeader });
  } catch (err) {
    console.log('Error', err);
  }
};
