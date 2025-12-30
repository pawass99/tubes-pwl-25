import pool from "../config/db.js";

export const getAllGenres = async () => {
  const [rows] = await pool.query("SELECT * FROM genres ORDER BY name ASC");
  return rows;
};

export const getGenreById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM genres WHERE id = ?", [id]);
  return rows[0];
};

export const createGenre = async (data) => {
  const { name, description, popularity_score, is_active } = data;
  const [result] = await pool.query(
    "INSERT INTO genres (name, description, popularity_score, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
    [name, description, popularity_score, is_active]
  );
  return { id: result.insertId, ...data };
};

export const updateGenre = async (id, data) => {
  const { name, description, popularity_score, is_active } = data;
  await pool.query(
    "UPDATE genres SET name=?, description=?, popularity_score=?, is_active=?, updated_at=NOW() WHERE id=?",
    [name, description, popularity_score, is_active, id]
  );
  return getGenreById(id);
};

export const deleteGenre = async (id) => {
  await pool.query("DELETE FROM genres WHERE id = ?", [id]);
};
