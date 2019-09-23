import { userModel } from '../model/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const PRIVATE_KEY = 'mySecret';

const USER_ROLE = {
  ADMIN: 'ADMIN',
};

export const verifyAccessToken = async (accessToken) => {
  try {
    const data = await jwt.verify(accessToken, PRIVATE_KEY);
    return data;
  } catch (err) {
    throw err;
  }
};

export const generateAccessToken = (userId) => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 3600,
      userId,
    },
    PRIVATE_KEY,
  );
  return token;
};

export const me = async (accessToken) => {
  try {
    const tokenData = await verifyAccessToken(accessToken);
    if (tokenData && tokenData.userId) {
      const user = await userModel.findById(tokenData.userId);

      if (user) {
        return {
          _id: user._id,
          emailAddress: user.emailAddress,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          role: user.role,
        };
      }
      throw new Error('User not found');
    }
  } catch (err) {
    throw err;
  }
};

export const loginUser = async (emailAddress, password) => {
  try {
    const user = await userModel.findOne({ emailAddress });
    if (user) {
      const passwordMatched = bcrypt.compareSync(password, user.password);
      if (!passwordMatched) {
        throw new Error('Password not matched');
      }
      const generatedAccessToken = generateAccessToken(user._id);
      return generatedAccessToken;
    }
    throw new Error('Email address not found');
  } catch (err) {
    throw err;
  }
};

export const createUser = async (emailAddress, password) => {
  try {
    const user = await userModel.findOne({ emailAddress });
    if (user) {
      throw new Error('Email already exists');
    }

    const newUser = await userModel.create({
      emailAddress,
      password: bcrypt.hashSync(password, 10),
      role: USER_ROLE.ADMIN,
    });

    if (newUser) {
      const generatedAccessToken = generateAccessToken(newUser._id);
      return generatedAccessToken;
    }

    throw new Error('Failed to create user');
  } catch (err) {
    throw err;
  }
};
