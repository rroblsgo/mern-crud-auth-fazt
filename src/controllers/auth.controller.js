import User from '../models/user.model.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    const userSaved = await newUser.save();
    res.send({ message: 'User created', userSaved });
  } catch (error) {
    res.send({ message: 'Not created', error: error.message });
  }
};

export const login = (req, res) => {
  res.send('Login');
};
