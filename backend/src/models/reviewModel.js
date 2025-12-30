import pool from "../config/db.js";

export const getReviewsByMovie = async (movieId) => {
  const [rows] = await pool.query(
    `SELECT r.*, u.name as user_name 
     FROM reviews r 
     JOIN users u ON r.user_id = u.id 
     WHERE r.movie_id = ? 
     ORDER BY r.review_date DESC`,
    [movieId]
  );
  return rows;
};

export const getReviewById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM reviews WHERE id = ?", [id]);
  return rows[0];
};

export const createReview = async (movieId, data) => {
  const { user_id, score, comment, is_spoiler } = data;
  const [result] = await pool.query(
    "INSERT INTO reviews (movie_id, user_id, score, comment, is_spoiler, review_date, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), NOW())",
    [movieId, user_id, score, comment, is_spoiler]
  );
  return { id: result.insertId, ...data, movie_id: movieId };
};

export const updateReview = async (id, data) => {
  const { score, comment, is_spoiler } = data;
  await pool.query(
    "UPDATE reviews SET score=?, comment=?, is_spoiler=?, updated_at=NOW() WHERE id=?",
    [score, comment, is_spoiler, id]
  );
  return getReviewById(id);
};

export const deleteReview = async (id) => {
  await pool.query("DELETE FROM reviews WHERE id = ?", [id]);
};
