import { Router } from "express";
import authRoutes from "./authRoutes";
import contentRoutes from "./contentRoutes";
import shareRoutes from "./shareRoutes";

const router = Router();

// Register all routes
router.use(authRoutes);
router.use(contentRoutes);
router.use(shareRoutes);

export default router;
