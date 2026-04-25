import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';

export async function register(req, res) {
  try {
    const user = await User.create(req.body);
    const token = signToken({ id: user._id, role: user.role });
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = signToken({ id: user._id, role: user.role });
  user.password = undefined;

  return res.json({ token, user });
}
