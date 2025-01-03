import { Request, Response } from "express";
import { UserModel } from "../models/db";
import { SignJWT } from "jose";
import { TextEncoder } from "util";

// Signup route logic
export const signupMiddleware = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        await UserModel.create({ username, password });
        res.json({ message: "User signed up" });
    } catch (e) {
        res.status(409).json({ message: "User already exists" });
    }
};

// Sign-in route logic
export const signinMiddleware = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({ username, password });

    if (existingUser) {
        // Use jose to sign the JWT
        const token = await new SignJWT({ id: existingUser._id })
            .setProtectedHeader({ alg: "HS256" })
            .sign(new TextEncoder().encode(process.env.JWT_PASSWORD));

        res.json({ token });
    } else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
};
