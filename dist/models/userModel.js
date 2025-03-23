"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Username is required!"],
        trim: true,
        minlength: [3, "minimum 3 characters long"],
        maxlength: [20, "maximum 20 charcters long"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: [5, "minimum 5 characters long"],
    }
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
