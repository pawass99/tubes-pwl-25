import {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../models/genreModel.js";

export const listGenres = async (req, res, next) => {
  try {
    const genres = await getAllGenres();
    res.json(genres);
  } catch (err) {
    next(err);
  }
};

export const getGenre = async (req, res, next) => {
  try {
    const genre = await getGenreById(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });
    res.json(genre);
  } catch (err) {
    next(err);
  }
};

export const createGenreController = async (req, res, next) => {
  try {
    const genre = await createGenre(req.body);
    res.status(201).json(genre);
  } catch (err) {
    next(err);
  }
};

export const updateGenreController = async (req, res, next) => {
  try {
    const existing = await getGenreById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Genre not found" });
    const genre = await updateGenre(req.params.id, req.body);
    res.json(genre);
  } catch (err) {
    next(err);
  }
};

export const deleteGenreController = async (req, res, next) => {
  try {
    const existing = await getGenreById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Genre not found" });
    await deleteGenre(req.params.id);
    res.json({ message: "Genre deleted" });
  } catch (err) {
    next(err);
  }
};
