import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import userRoutes from './routes/user.js';

const app = express();

mongoose
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

app.use('/api/user', userRoutes);

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});