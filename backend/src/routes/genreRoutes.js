import { Router } from "express";
import {
  listGenres,
  getGenre,
  createGenreController,
  updateGenreController,
  deleteGenreController,
} from "../controllers/genreController.js";
import { auth, isAdmin } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validate.js";

const router = Router();

router.get("/", listGenres);
router.get("/:id", getGenre);
router.post("/", auth, isAdmin, validateBody, createGenreController);
router.put("/:id", auth, isAdmin, validateBody, updateGenreController);
router.delete("/:id", auth, isAdmin, deleteGenreController);

export default router;
