var mongoose = require('mongoose');
require('mongoose-type-email');
import uuid from 'uuid/v4';

export const userModel = mongoose.model(
  'users',
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => uuid(),
      },
      emailAddress: mongoose.SchemaTypes.Email,
      password: String,
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    },
  ),
);

export const deviceModel = mongoose.model(
  'device',
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => uuid(),
      },
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

export const institutionUser = mongoose.model(
  'institutionUser',
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => uuid(),
      },
      userId: String,
      institutionId: String,
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

export const institutionModel = mongoose.model(
  'institution',
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => uuid(),
      },
      name: String,
      streetAddress: String,
      city: String,
      state: String,
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    },
  ),
);
