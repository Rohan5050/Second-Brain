"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSharedLinkMiddleware = exports.shareLinkMiddleware = exports.deleteContentMiddleware = exports.getContentMiddleware = exports.addContentMiddleware = void 0;
const db_1 = require("../models/db");
// Add content route logic
const addContentMiddleware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, link, type } = req.body;
        const userId = req.userId; // Ensure `userId` is extracted from the authenticated request
        if (!userId) {
            res.status(403).json({ message: "User not authenticated" });
            return;
        }
        // Create a new content document
        const content = yield db_1.ContentModel.create({
            title,
            link,
            type,
            userId, // Attach userId to the document
        });
        res.status(201).json({ message: "Content added", content });
    }
    catch (error) {
        console.error("Error adding content:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addContentMiddleware = addContentMiddleware;
// Get content route logic
const getContentMiddleware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId; // Extract userId from the authenticated request
        if (!userId) {
            res.status(403).json({ message: "User ID missing" });
            return;
        }
        // Fetch content specific to the logged-in user
        const content = yield db_1.ContentModel.find({ userId });
        res.status(200).json({ content });
    }
    catch (error) {
        console.error("Error fetching content:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getContentMiddleware = getContentMiddleware;
// Delete content route logic
const deleteContentMiddleware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    yield db_1.ContentModel.deleteMany({ contentId });
    res.json({ message: "Deleted" });
});
exports.deleteContentMiddleware = deleteContentMiddleware;
// Share link route logic
const shareLinkMiddleware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne(); // Removed userId dependency
        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }
        const hash = Math.random().toString(36).substring(7); // Random hash generation
        yield db_1.LinkModel.create({ hash });
        res.json({ hash });
    }
    else {
        yield db_1.LinkModel.deleteOne();
        res.json({ message: "Removed link" });
    }
});
exports.shareLinkMiddleware = shareLinkMiddleware;
// Fetch shared link content route logic
const fetchSharedLinkMiddleware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shareLink: hash } = req.params;
    const link = yield db_1.LinkModel.findOne({ hash });
    if (!link) {
        res.status(411).json({ message: "Sorry, incorrect input" });
        return;
    }
    const content = yield db_1.ContentModel.find(); // Fetch content without userId
    res.json({ content });
});
exports.fetchSharedLinkMiddleware = fetchSharedLinkMiddleware;
