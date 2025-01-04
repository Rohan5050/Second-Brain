"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contentMiddleware_1 = require("../middleware/contentMiddleware");
const userMiddleware_1 = require("../middleware/userMiddleware");
const router = (0, express_1.Router)();
// Add content route
router.post("/content", userMiddleware_1.userMiddleware, contentMiddleware_1.addContentMiddleware);
// Get content route
router.get("/api/v1/content", userMiddleware_1.userMiddleware, contentMiddleware_1.getContentMiddleware);
// Delete content route
//router.delete("/api/v1/content", userMiddleware, deleteContentMiddleware);
exports.default = router;
