import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import globalRoutes from './routes/global.js';

dotenv.config();

const main = async () => {
  const app = express();

  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Database connected');
    })
    .catch(error => {
      console.log(error);
    });

  app.use(express.json());
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
  );

  app.use('/api/user', userRoutes);
  app.use('/api/post', postRoutes);

  app.use('/api/global', globalRoutes);

  const port = process.env.PORT || 3908;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

main();