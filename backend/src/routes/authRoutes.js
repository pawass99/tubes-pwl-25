import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validateBody } from "../middlewares/validate.js";

const router = Router();

router.post("/login", validateBody, login);
router.post("/register", validateBody, register);

export default router;
