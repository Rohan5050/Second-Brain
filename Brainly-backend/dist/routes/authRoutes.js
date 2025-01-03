"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Signup route
router.post("/api/v1/signup", authMiddleware_1.signupMiddleware);
// Signin route
router.post("/signin", authMiddleware_1.signinMiddleware);
exports.default = router;
