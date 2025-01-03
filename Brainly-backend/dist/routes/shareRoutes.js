"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contentMiddleware_1 = require("../middleware/contentMiddleware");
const userMiddleware_1 = require("../middleware/userMiddleware");
const router = (0, express_1.Router)();
// Share link route
router.post("/api/v1/brain/share", userMiddleware_1.userMiddleware, contentMiddleware_1.shareLinkMiddleware);
// Fetch shared link route
router.get("/api/v1/brain/:shareLink", contentMiddleware_1.fetchSharedLinkMiddleware);
exports.default = router;
