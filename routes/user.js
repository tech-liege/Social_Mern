import express, { json } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.query.password, 10);
    // const user = await User.create(req.body);
    // res.status(201).json(user);
    const user = new User({
      username: req.query.username,
      email: req.query.email,
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
    const user = await User.findOne({ 'email': req.query.email });
    if (!user) return res.status(404).json({ message: 'User does not exist' });

    const isMatch = await bcrypt.compare(req.query.password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

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
      res
        .status(201)
        .json({ 'message': 'Successful', 'User': currentUser, 'TargetUser': targetUser });
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
      res
        .status(201)
        .json({ 'message': 'Successful', 'User': currentUser, 'TargetUser': targetUser });
    } else {
      res.status(400).json({ message: 'Not following' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users
router.get('/exploreUsers', authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    const currentUser = await User.findById(req.user._id);
    const filteredUsers = users.filter(user => user._id != currentUser._id);
    console.log(filteredUsers);
    res.json(filteredUsers);
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

export default router;
