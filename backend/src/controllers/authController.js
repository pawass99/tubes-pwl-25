import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findByEmail, findById } from "../models/userModel.js";

const generateToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    const existing = await findByEmail(email);
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const password_hash = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, password_hash, role });
    const token = generateToken({ id: user.id, role: role });
    res.status(201).json({
      token,
      user: { id: user.id, name, email, role },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    const safeUser = await findById(user.id);
    res.json({ token, user: safeUser });
  } catch (err) {
    next(err);
  }
};
