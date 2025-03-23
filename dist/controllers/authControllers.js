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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.signIn = exports.signUp = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jwt_1 = require("../utils/jwt");
const zod_1 = require("zod");
const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error("JWT_TOKEN is not defined in environment variables.");
}
const signInProps = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5).max(20),
});
const signUpProps = zod_1.z.object({
    name: zod_1.z.string().min(3).max(20),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5).max(20),
});
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = signUpProps.safeParse(req.body);
    if (!user.success) {
        return res.status(400).json({ success: false, message: user.error });
    }
    try {
        const existingUser = yield userModel_1.default.findOne({ email: user.data.email });
        if (!existingUser) {
            const newUser = new userModel_1.default({ name: user.data.name, email: user.data.email, password: user.data.password });
            const newDoc = yield newUser.save();
            const token = (0, jwt_1.generateToken)({ id: newDoc._id }, secret);
            res.cookie("session_token", token, {
                httpOnly: true,
                secure: false,
            });
            return res.status(201).json({ success: true, message: "Sign Up Successful!" });
        }
        return res.status(409).json({ success: false, message: "User already exist! Please Login." });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Sign Up Failed! Something went wrong." });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = signInProps.safeParse(req.body);
    if (!user.success) {
        return res.status(400).json({ success: false, message: user.error });
    }
    try {
        const existingUser = yield userModel_1.default.findOne({ email: user.data.email, password: user.data.password });
        if (existingUser) {
            const token = (0, jwt_1.generateToken)({ id: existingUser._id }, secret);
            res.cookie("session_token", token, {
                httpOnly: true,
                secure: false,
            });
            return res.status(201).json({ success: true, message: "Sign In Successful!" });
        }
        return res.status(409).json({ success: false, message: "Wrong Email or Password" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Sign Up Failed! Something went wrong." });
    }
});
exports.signIn = signIn;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("session_token");
    return res.status(200).json({ success: true, message: "Logout Successfull!" });
});
exports.logout = logout;
