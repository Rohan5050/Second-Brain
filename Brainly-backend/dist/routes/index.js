"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const contentRoutes_1 = __importDefault(require("./contentRoutes"));
const shareRoutes_1 = __importDefault(require("./shareRoutes"));
const router = (0, express_1.Router)();
// Register all routes
router.use(authRoutes_1.default);
router.use(contentRoutes_1.default);
router.use(shareRoutes_1.default);
exports.default = router;
