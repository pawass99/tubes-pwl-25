import {
  getReviewsByMovie,
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
} from "../models/reviewModel.js";

export const listReviews = async (req, res, next) => {
  try {
    const reviews = await getReviewsByMovie(req.params.movieId);
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

export const createReviewController = async (req, res, next) => {
  try {
    const review = await createReview(req.params.movieId, {
      ...req.body,
      user_id: req.user.id,
    });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

export const updateReviewController = async (req, res, next) => {
  try {
    const existing = await getReviewById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Review not found" });
    if (existing.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    const review = await updateReview(req.params.id, req.body);
    res.json(review);
  } catch (err) {
    next(err);
  }
};

export const deleteReviewController = async (req, res, next) => {
  try {
    const existing = await getReviewById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Review not found" });
    if (existing.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    await deleteReview(req.params.id);
    res.json({ message: "Review deleted" });
  } catch (err) {
    next(err);
  }
};
