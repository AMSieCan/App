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
  'devices',
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

export const institutionUserModel = mongoose.model(
  'institutionUsers',
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => uuid(),
      },
      userId: {
        type: String,
        ref: 'users',
      },
      institutionId: {
        type: String,
        ref: 'institutions',
      },
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
  'institutions',
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
