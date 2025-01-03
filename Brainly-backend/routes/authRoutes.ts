import { Router } from "express";
import { signupMiddleware, signinMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Signup route
router.post("/api/v1/signup", signupMiddleware);

// Signin route
router.post("/signin", signinMiddleware);

export default router;
