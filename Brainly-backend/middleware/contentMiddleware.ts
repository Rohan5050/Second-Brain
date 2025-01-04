import { Request, Response } from "express";
import { ContentModel, LinkModel } from "../models/db";

// Add content route logic
export const addContentMiddleware = async (req: Request, res: Response) => {
    const { link, type, title } = req.body;

    await ContentModel.create({
        link,
        type,
        title,
    });

    res.json({ message: "Content added" });
};

// Get content route logic
export const getContentMiddleware = async (req: Request, res: Response) => {
    const content = await ContentModel.find(); // Fetch all content without userId
    res.json({ content });
};

// Delete content route logic
export const deleteContentMiddleware = async (req: Request, res: Response) => {
    const { contentId } = req.body;

    await ContentModel.deleteMany({ contentId });

    res.json({ message: "Deleted" });
};

// Share link route logic
export const shareLinkMiddleware = async (req: Request, res: Response) => {
    const { share } = req.body;

    if (share) {
        const existingLink = await LinkModel.findOne(); // Removed userId dependency

        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }

        const hash = Math.random().toString(36).substring(7); // Random hash generation
        await LinkModel.create({ hash });
        res.json({ hash });
    } else {
        await LinkModel.deleteOne();
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

    const content = await ContentModel.find(); // Fetch content without userId
    res.json({ content });
};
