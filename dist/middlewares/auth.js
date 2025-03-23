"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error("Secret not found!");
}
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.session_token;
    if (!token) {
        res.status(401).json({ success: false, message: "No token provided in the cookies! " });
        return;
    }
    const decoded = jsonwebtoken_1.default.verify(token, secret);
    req.userId = decoded.id;
    next();
};
exports.verifyToken = verifyToken;
