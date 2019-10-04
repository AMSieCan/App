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
      institutionId: {
        type: String,
        ref: 'instititutions',
      },
      lastVisit: Date,
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
      lat: Number,
      long: Number,
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    },
  ),
);

export const sensorDataModel = mongoose.model(
  'sensors',
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => uuid(),
      },
      description: String, // Data type descriptor e.g. distance, count, error
      data: String, // Actual data e.g. 10
      deviceID: String,
      recordedAt: String, // Time from device
    },
    {
      timestamps: {
        createdAt: 'createdAt', 
        updatedAt: 'updatedAt',
      },
    },
  )
);