import bcryptjs from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import User from '../models/user.model.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
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

export const login = (req, res) => {
  res.send('Login');
};
