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
exports.signinMiddleware = exports.signupMiddleware = void 0;
const db_1 = require("../models/db");
const jose_1 = require("jose");
const util_1 = require("util");
// Signup route logic
const signupMiddleware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        yield db_1.UserModel.create({ username, password });
        res.json({ message: "User signed up" });
    }
    catch (e) {
        res.status(409).json({ message: "User already exists" });
    }
});
exports.signupMiddleware = signupMiddleware;
// Sign-in route logic
const signinMiddleware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const existingUser = yield db_1.UserModel.findOne({ username, password });
    if (existingUser) {
        // Use jose to sign the JWT
        const token = yield new jose_1.SignJWT({ id: existingUser._id })
            .setProtectedHeader({ alg: "HS256" })
            .sign(new util_1.TextEncoder().encode(process.env.JWT_PASSWORD));
        res.json({ token });
    }
    else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
});
exports.signinMiddleware = signinMiddleware;
