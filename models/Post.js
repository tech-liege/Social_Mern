import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
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
  // comments: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Comment',
  //   },
  // ],
  comment: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      content: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
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

export default model('Post', PostSchema);
