"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const todoSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Title is required!"]
    },
    description: {
        type: String,
        required: [true, "Description is required!"]
    },
    done: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
        required: [true, "User ID is required!"]
    }
});
const Todo = mongoose_1.default.model("Todo", todoSchema);
exports.default = Todo;
