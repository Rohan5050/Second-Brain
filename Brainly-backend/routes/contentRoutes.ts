import express from "express";
import { addContentMiddleware, getContentMiddleware, deleteContentMiddleware } from "../middleware/contentMiddleware";
import { userMiddleware } from "../middleware/userMiddleware";

const router = express.Router();

// Add content route
router.post("/content", userMiddleware, addContentMiddleware);

// Get content route
router.get("/api/v1/content", userMiddleware, getContentMiddleware);

// Delete content route
//router.delete("/api/v1/content", userMiddleware, deleteContentMiddleware);

export default router;
