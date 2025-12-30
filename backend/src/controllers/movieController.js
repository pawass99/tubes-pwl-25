import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../models/movieModel.js";
import { getReviewsByMovie } from "../models/reviewModel.js";

export const listMovies = async (req, res, next) => {
  try {
    const { genreId, search } = req.query;
    const movies = await getMovies({ genreId, search });
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

export const getMovie = async (req, res, next) => {
  try {
    const movie = await getMovieById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    const reviews = await getReviewsByMovie(req.params.id);
    res.json({ ...movie, reviews });
  } catch (err) {
    next(err);
  }
};

export const createMovieController = async (req, res, next) => {
  try {
    const movie = await createMovie(req.body);
    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
};

export const updateMovieController = async (req, res, next) => {
  try {
    const existing = await getMovieById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Movie not found" });
    const movie = await updateMovie(req.params.id, req.body);
    res.json(movie);
  } catch (err) {
    next(err);
  }
};

export const deleteMovieController = async (req, res, next) => {
  try {
    const existing = await getMovieById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Movie not found" });
    await deleteMovie(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (err) {
    next(err);
  }
};
