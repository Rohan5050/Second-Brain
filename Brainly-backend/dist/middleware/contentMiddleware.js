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
    const { link, type, title } = req.body;
    yield db_1.ContentModel.create({
        link,
        type,
        title,
        userId: req.userId,
        tags: []
    });
    res.json({ message: "Content added" });
});
exports.addContentMiddleware = addContentMiddleware;
// Get content route logic
const getContentMiddleware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const content = yield db_1.ContentModel.find({ userId }).populate("userId", "username");
    res.json({ content });
});
exports.getContentMiddleware = getContentMiddleware;
// Delete content route logic
const deleteContentMiddleware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    yield db_1.ContentModel.deleteMany({ contentId, userId: req.userId });
    res.json({ message: "Deleted" });
});
exports.deleteContentMiddleware = deleteContentMiddleware;
// Share link route logic
const shareLinkMiddleware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({ userId: req.userId });
        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }
        const hash = Math.random().toString(36).substring(7); // Random hash generation
        yield db_1.LinkModel.create({ userId: req.userId, hash });
        res.json({ hash });
    }
    else {
        yield db_1.LinkModel.deleteOne({ userId: req.userId });
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
    const content = yield db_1.ContentModel.find({ userId: link.userId });
    const user = yield db_1.UserModel.findOne({ _id: link.userId });
    if (!user) {
        res.status(411).json({ message: "User not found, error should ideally not happen" });
        return;
    }
    res.json({ username: user.username, content });
});
exports.fetchSharedLinkMiddleware = fetchSharedLinkMiddleware;
