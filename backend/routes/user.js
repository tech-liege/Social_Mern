import express, { json } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // const user = await User.create(req.body);
    // res.status(201).json(user);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    var user = {};
    if (req.body.email) {
      user = await User.findOne({ 'email': req.body.email });
    } else {
      user = await User.findOne({ 'username': req.body.username });
    }
    if (!user) return res.status(404).json({ message: 'User does not exist' });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '168h' });

    res.header('Authorization', token).json({ token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/follow/:userId', authenticateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const targetUser = await User.findById(req.params.userId);

    if (!currentUser.following.includes(targetUser._id)) {
      currentUser.following.push(targetUser._id);
      await currentUser.save();
      targetUser.followers.push(currentUser._id);
      await targetUser.save();
      res.status(201).json({ 'message': 'Successful', 'User': currentUser, 'TargetUser': targetUser });
    } else {
      res.status(400).json({ message: 'Already following' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/unfollow/:userId', authenticateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const targetUser = await User.findById(req.params.userId);

    if (currentUser.following.includes(targetUser._id)) {
      currentUser.following.pull(targetUser._id);
      await currentUser.save();
      targetUser.followers.pull(currentUser._id);
      await targetUser.save();
      res.status(201).json({ 'message': 'Successful', 'User': currentUser, 'TargetUser': targetUser });
    } else {
      res.status(400).json({ message: 'Not following' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users
router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single user
router.get('/profile/:userId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/search/username', authenticateToken, async (req, res) => {
  try {
    const searchQuery = req.body.search;
    const regex = new RegExp(searchQuery, 'gi');

    const filteredUsers = await User.find({ username: regex });
    res.json({ filteredUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/search/email', authenticateToken, async (req, res) => {
  try {
    const searchQuery = req.body.search;
    const regex = new RegExp(searchQuery, 'gi');

    const filteredUsers = await User.find({ email: regex });
    res.json({ filteredUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
