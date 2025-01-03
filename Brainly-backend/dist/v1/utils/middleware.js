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
exports.userMiddleware = void 0;
const jose_1 = require("jose");
const userMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { payload } = yield (0, jose_1.jwtVerify)(token, new TextEncoder().encode(process.env.JWT_PASSWORD));
        // Check if the payload contains the user ID
        if (typeof payload === "string" || !payload.id) {
            res.status(403).json({
                message: "You are not logged in",
            });
            return;
        }
        req.userId = payload.id;
        next();
    }
    catch (error) {
        res.status(403).json({
            message: "Invalid or expired token",
            error: error.message,
        });
    }
});
exports.userMiddleware = userMiddleware;
/*import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, JWT_PASSWORD)
    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            })
            return;
        }
        req.userId = (decoded as JwtPayload).id;
        next()
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}*/
