import { Request, Response } from "express";
import { ContentModel, LinkModel } from "../models/db";

// Add content route logic

export const addContentMiddleware = async (req: Request, res: Response) => {
  try {
    const { title, link, type } = req.body;
    const userId = req.userId; // Ensure `userId` is extracted from the authenticated request

    if (!userId) {
      res.status(403).json({ message: "User not authenticated" });
      return;
    }

    // Create a new content document
    const content = await ContentModel.create({
      title,
      link,
      type,
      userId, // Attach userId to the document
    });

    res.status(201).json({ message: "Content added", content });
  } catch (error) {
    console.error("Error adding content:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get content route logic
export const getContentMiddleware = async (req: Request, res: Response) => {
    try {
        const userId = req.userId; // Extract userId from the authenticated request
        
        if (!userId) {
          res.status(403).json({ message: "User ID missing" });
          return;
        }
    
        // Fetch content specific to the logged-in user
        const content = await ContentModel.find({ userId });

        res.status(200).json({ content });
      } catch (error) {
        console.error("Error fetching content:", error);
        res.status(500).json({ message: "Internal server error" });
      }
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
