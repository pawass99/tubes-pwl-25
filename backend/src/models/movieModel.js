import pool from "../config/db.js";

export const getMovies = async ({ genreId, search }) => {
  let query = "SELECT m.*, g.name as genre_name FROM movies m JOIN genres g ON m.genre_id = g.id";
  const conditions = [];
  const params = [];

  if (genreId) {
    conditions.push("m.genre_id = ?");
    params.push(genreId);
  }

  if (search) {
    conditions.push("m.title LIKE ?");
    params.push(`%${search}%`);
  }

  if (conditions.length) {
    query += " WHERE " + conditions.join(" AND ");
  }

  query += " ORDER BY m.created_at DESC";

  const [rows] = await pool.query(query, params);
  return rows;
};

export const getMovieById = async (id) => {
  const [rows] = await pool.query(
    "SELECT m.*, g.name as genre_name FROM movies m JOIN genres g ON m.genre_id = g.id WHERE m.id = ?",
    [id]
  );
  return rows[0];
};

export const createMovie = async (data) => {
  const { genre_id, title, synopsis, release_date, duration_minutes, poster_url } = data;
  const [result] = await pool.query(
    "INSERT INTO movies (genre_id, title, synopsis, release_date, duration_minutes, poster_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())",
    [genre_id, title, synopsis, release_date, duration_minutes, poster_url]
  );
  return { id: result.insertId, ...data };
};

export const updateMovie = async (id, data) => {
  const { genre_id, title, synopsis, release_date, duration_minutes, poster_url } = data;
  await pool.query(
    "UPDATE movies SET genre_id=?, title=?, synopsis=?, release_date=?, duration_minutes=?, poster_url=?, updated_at=NOW() WHERE id=?",
    [genre_id, title, synopsis, release_date, duration_minutes, poster_url, id]
  );
  return getMovieById(id);
};

export const deleteMovie = async (id) => {
  await pool.query("DELETE FROM movies WHERE id = ?", [id]);
};
