import mongoose from 'mongoose';
import uuid from 'uuid/v4';

export const userModel = mongoose.model(
  'users',
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => uuid(),
      },
      emailAddress: String,
      password: String,
      role: String,
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    },
  ),
);

export const device = mongoose.model(
  'device',
  new mongoose.Schema(
    {
      _id: String,
      name: String,
      serialNumber: String,
      locationDescription: String,
      lat: Number,
      long: Number,
      status: Number,
      lastDescription: String,
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    },
  ),
);
