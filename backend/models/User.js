import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // age: {
  //   type: Number,
  //   unique: false,
  //   required: true,
  // },
  password: {
    type: String,
    required: true,
  },
  joined_at: {
    type: Date,
    default: Date.now,
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export default model('User', UserSchema);
