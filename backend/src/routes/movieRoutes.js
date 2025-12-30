import { Router } from "express";
import {
  listMovies,
  getMovie,
  createMovieController,
  updateMovieController,
  deleteMovieController,
} from "../controllers/movieController.js";
import {
  listReviews,
  createReviewController,
} from "../controllers/reviewController.js";
import { auth, isAdmin } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validate.js";

const router = Router();

router.get("/", listMovies);
router.get("/:id", getMovie);
router.post("/", auth, isAdmin, validateBody, createMovieController);
router.put("/:id", auth, isAdmin, validateBody, updateMovieController);
router.delete("/:id", auth, isAdmin, deleteMovieController);

router.get("/:movieId/reviews", listReviews);
router.post("/:movieId/reviews", auth, validateBody, createReviewController);

export default router;
