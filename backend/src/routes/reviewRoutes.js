import { Router } from "express";
import {
  updateReviewController,
  deleteReviewController,
} from "../controllers/reviewController.js";
import { auth } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validate.js";

const router = Router();

router.put("/:id", auth, validateBody, updateReviewController);
router.delete("/:id", auth, deleteReviewController);

export default router;
