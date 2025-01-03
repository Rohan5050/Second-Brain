import { Request, Response } from "express";
import { ContentModel, LinkModel, UserModel } from "../models/db";

// Add content route logic
export const addContentMiddleware = async (req: Request, res: Response) => {
    const { link, type, title } = req.body;

    await ContentModel.create({
        link,
        type,
        title,
        userId: req.userId,
        tags: []
    });

    res.json({ message: "Content added" });
};

// Get content route logic
export const getContentMiddleware = async (req: Request, res: Response) => {
    const { userId } = req;
    const content = await ContentModel.find({ userId }).populate("userId", "username");
    res.json({ content });
};

// Delete content route logic
export const deleteContentMiddleware = async (req: Request, res: Response) => {
    const { contentId } = req.body;

    await ContentModel.deleteMany({ contentId, userId: req.userId });

    res.json({ message: "Deleted" });
};

// Share link route logic
export const shareLinkMiddleware = async (req: Request, res: Response) => {
    const { share } = req.body;

    if (share) {
        const existingLink = await LinkModel.findOne({ userId: req.userId });

        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }

        const hash = Math.random().toString(36).substring(7); // Random hash generation
        await LinkModel.create({ userId: req.userId, hash });
        res.json({ hash });
    } else {
        await LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Removed link" });
    }
};

// Fetch shared link content route logic
export const fetchSharedLinkMiddleware = async (req: Request, res: Response) => {
    const { shareLink: hash } = req.params;

    const link = await LinkModel.findOne({ hash });

    if (!link) {
        res.status(411).json({ message: "Sorry, incorrect input" });
        return;
    }

    const content = await ContentModel.find({ userId: link.userId });
    const user = await UserModel.findOne({ _id: link.userId });

    if (!user) {
        res.status(411).json({ message: "User not found, error should ideally not happen" });
        return;
    }

    res.json({ username: user.username, content });
};
