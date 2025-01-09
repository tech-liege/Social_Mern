import express, { json } from 'express';
import User from '../models/User.js';
import { Post, Comment } from '../models/Post.js';

import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post('/create', authenticateToken, async (req, res) => {
  try {
    const post = new Post({
      title: req.query.title,
      content: req.query.content,
      created_by: req.user._id,
    });
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('created_by', ['username', 'email'])
      .populate('likes', ['username'])
      .populate('comment', ['content', 'created_by', 'created_at'])
      .populate('shares', ['username']);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:postId', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('created_by', ['username', 'email'])
      .populate('likes', ['username'])
      .populate('comment', ['content', 'created_by', 'created_at'])
      .populate('shares', ['username']);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/:postId/like', authenticateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.likes.includes(currentUser._id)) {
      post.likes.push(currentUser._id);
      await post.save();

      res.status(201).json({ message: 'Liked successfully' });
    } else {
      res.status(400).json({ message: 'Already liked' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/:postId/unlike', authenticateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.likes.includes(currentUser._id)) {
      post.likes.pull(currentUser._id);
      await post.save();

      res.status(201).json({ message: 'Unliked successfully' });
    } else {
      res.status(400).json({ message: "Haven't liked" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/:postId/share', authenticateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.shares.includes(currentUser._id)) {
      post.shares.push(currentUser._id);
      await post.save();

      res.status(201).json({ message: 'shared successfully' });
    } else {
      res.status(400).json({ message: 'Already shared' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/:postId/unshare', authenticateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.shares.includes(currentUser._id)) {
      post.shares.pull(currentUser._id);
      await post.save();

      res.status(201).json({ message: 'Unshared successfully' });
    } else {
      res.status(400).json({ message: "Haven't shared" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/:postId/comment/create', authenticateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = new Comment({
      content: req.query.content,
      created_by: currentUser._id,
      post: post._id,
    });
    const newComment = await comment.save();

    post.comment.push(newComment._id);
    await post.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/:postId/comment/:commentId/update', authenticateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.created_by.toString() !== currentUser._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    comment.content = req.query.content || comment.content;
    await comment.save();

    res.json({ message: 'Comment updated successfully', comment });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/:postId/comment/:commentId/delete', authenticateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.created_by.toString() !== currentUser._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (post.comment.includes(comment._id)) {
      post.comment.pull(comment._id);
      await post.save();

      await Comment.findByIdAndDelete(comment._id);
      res.status(201).json({ message: 'Comment deleted successfully' });
    } else {
      res.status(400).json({ message: "Comment doesn't belong to the post" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find({ created_by: req.params.userId })
      .populate('created_by', ['username', 'email'])
      .populate('likes', ['username'])
      .populate('comment', ['content', 'created_by', 'created_at'])
      .populate('shares', ['username']);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/delete/:postId', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.created_by.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const deletedPost = await Post.findByIdAndDelete(post._id);
    res.json({ message: 'Successful', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/update/:postId', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.title = req.query.title || post.title;
    post.content = req.query.content || post.content;
    await post.save();
    res.json({ message: 'Successful', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/search', authenticateToken, async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const regex = new RegExp(searchQuery, 'gi');

    const filteredPosts = await Post.find({ title: regex })
      .populate('created_by', ['username', 'email'])
      .populate('likes', ['username'])
      .populate('comment', ['content', 'created_by', 'created_at'])
      .populate('shares', ['username']);
    res.json({ filteredPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
