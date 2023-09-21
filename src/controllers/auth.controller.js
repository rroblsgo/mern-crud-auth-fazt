import bcryptjs from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import User from '../models/user.model.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (userFound) {
      // return res.status(400).json({ message: 'User email already exists' });
      return res.status(400).json(['User email already exists']);
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    const userSaved = await newUser.save();
    const user = {
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    };
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie('access_token', token);
    res.status(201).json({ message: 'User created', user, token });
  } catch (error) {
    res.status(500).json({ message: 'Not created', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const user = {
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    };
    const token = await createAccessToken({ id: userFound._id });
    res.cookie('access_token', token);
    res.status(200).json({ message: 'User logged in', user, token });
  } catch (error) {
    res.status(500).json({ message: 'Not logged in', error: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie('access_token', '', { maxAge: 0 });
  res.status(200).json({ message: 'User logged out' });
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};
