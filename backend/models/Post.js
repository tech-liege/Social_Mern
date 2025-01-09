import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
}); // Disable automatic _id field creation for subdocuments

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  shares: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// Export models
export const Post = model('Post', PostSchema);
export const Comment = model('Comment', CommentSchema);
