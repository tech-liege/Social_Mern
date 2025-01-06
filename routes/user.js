import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/users', async (req, res) => {
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
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

// // Get all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

export default router;
