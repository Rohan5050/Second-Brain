import { Router } from "express";
import { shareLinkMiddleware, fetchSharedLinkMiddleware } from "../middleware/contentMiddleware";
import { userMiddleware } from "../middleware/userMiddleware";

const router = Router();

// Share link route
router.post("/api/v1/brain/share", userMiddleware, shareLinkMiddleware);

// Fetch shared link route
router.get("/api/v1/brain/:shareLink", fetchSharedLinkMiddleware);

export default router;
