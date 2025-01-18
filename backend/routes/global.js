import express, { json } from 'express';
import User from '../models/User.js';
import { Post, Comment } from '../models/Post.js';

import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post('/search', authenticateToken, async (req, res) => {
  try {
    const searchQuery = req.body.searchInput;

    if (!searchQuery) {
      res.status(400).json({ message: 'Please provide a search query' });
      return;
    } else if (isNaN(searchQuery)) {
      res.status(400).json({ message: 'Invalid search query' });
      return;
    } else if (searchQuery.length < 3) {
      res.status(400).json({ message: 'Search query must be at least 3 characters long' });
      return;
    }

    const regex = new RegExp(searchQuery, 'gi');

    const postsByTitle = await Post.find({ title: regex })
      .populate('created_by', ['username', 'email'])
      .populate('likes', ['username'])
      .populate('comment', ['content', 'created_by', 'created_at'])
      .populate('shares', ['username']);
    const postsByContent = await Post.find({ content: regex })
      .populate('created_by', ['username', 'email'])
      .populate('likes', ['username'])
      .populate('comment', ['content', 'created_by', 'created_at'])
      .populate('shares', ['username']);
    const commentsByContent = await Comment.find({ content: regex }).populate('created_by', ['username']).populate('likes', ['username']);
    const usersByUsername = await User.find({ username: regex }).populate('followers', ['username']).populate('following', ['username']);
    const usersByEmail = await User.find({ email: regex }).populate('followers', ['username']).populate('following', ['username']);

    if (
      postsByTitle.length === 0 &&
      postsByContent.length === 0 &&
      commentsByContent.length === 0 &&
      usersByUsername.length === 0 &&
      usersByEmail.length === 0
    ) {
      res.status(404).json({ message: 'No results found' });
      return;
    }

    // Compile all query results
    const posts = [...postsByTitle, ...postsByContent];
    const comments = [...commentsByContent];
    const users = [...usersByUsername, ...usersByEmail];

    // Remove duplicates and sort by creation date
    const uniquePosts = [...new Set(posts.map(post => post._id))].map(id => ({ ...posts.find(post => post._id.toString() === id) }));
    const uniqueComments = [...new Set(comments.map(comment => comment._id))].map(id => ({
      ...comments.find(comment => comment._id.toString() === id),
    }));
    const uniqueUsers = [...new Set(users.map(user => user._id))].map(id => ({ ...users.find(user => user._id.toString() === id) }));

    const sortedPosts = uniquePosts.sort((a, b) => b.created_at - a.created_at);
    const sortedComments = uniqueComments.sort((a, b) => b.created_at - a.created_at);
    const sortedUsers = uniqueUsers.sort((a, b) => b.created_at - a.created_at);

    res.json({ message: 'Search successful', posts: sortedPosts, comments: sortedComments, users: sortedUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
