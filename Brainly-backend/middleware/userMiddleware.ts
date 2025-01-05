import { NextFunction, Request, Response } from "express";
import { jwtVerify, JWTPayload } from "jose";

declare module "express-serve-static-core" {
    interface Request {
        userId?: string;
    }
}

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    if (!header) {
        res.status(403).json({
            message: "Authorization header is missing",
        });
        return;
    }

    const token = header.split(" ")[1];
    if (!token) {
        res.status(403).json({
            message: "Token is missing in the Authorization header",
        });
        return;
    }

    try {
        // Verify the token using `jose`
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_PASSWORD)
        );

        // Check if the payload contains the user ID
        if (typeof payload === "string" || !payload.id) {
            res.status(403).json({
                message: "You are not logged in",
            });
            return;
        }

        req.userId = (payload as JWTPayload).id as string;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid or expired token",
            error: error.message,
        });
    }
};


