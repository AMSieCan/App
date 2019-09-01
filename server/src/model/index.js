import mongoose from 'mongoose';

export const userModel = mongoose.model(
  'users',
  new mongoose.Schema({
    _id: {
      type: String,
    },
  }),
);
