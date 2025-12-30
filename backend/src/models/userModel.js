import pool from "../config/db.js";

export const findByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

export const createUser = async (user) => {
  const { name, email, password_hash, role } = user;
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, NOW())",
    [name, email, password_hash, role]
  );
  return { id: result.insertId, ...user };
};

export const findById = async (id) => {
  const [rows] = await pool.query("SELECT id, name, email, role, created_at FROM users WHERE id = ?", [id]);
  return rows[0];
};
