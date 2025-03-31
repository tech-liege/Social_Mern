import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  content: { type: String, required: true },
  image: { type: String },
  video: { type: String },
  location: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  shares: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

export default model('Post', postSchema);
