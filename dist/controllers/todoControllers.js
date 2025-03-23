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
exports.markAs = exports.deleteTodos = exports.getTodos = exports.addTodos = void 0;
const todoModel_1 = __importDefault(require("../models/todoModel"));
const zod_1 = require("zod");
const todoProps = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
});
const updateProps = zod_1.z.object({
    done: zod_1.z.boolean(),
});
const addTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = todoProps.safeParse(req.body);
    if (!todo.success) {
        return res.status(400).json({ success: false, message: todo.error });
    }
    try {
        const newTodo = new todoModel_1.default({ title: todo.data.title, description: todo.data.description, userId: req.userId });
        const newDoc = yield newTodo.save();
        res.status(200).json({ sucsess: true, message: newDoc._id });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ succes: false, message: "Can't create new todo. Something went wrong!" });
    }
});
exports.addTodos = addTodos;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todoModel_1.default.find({ userId: req.userId });
        if (!todos) {
            return res.json({ success: false, message: "No todos to show yet!" });
        }
        return res.status(201).json({ success: true, data: todos });
    }
    catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Can't get todos! Something went wrong." });
    }
});
exports.getTodos = getTodos;
const deleteTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const todo = yield todoModel_1.default.findOneAndDelete({ _id: id });
        if (!todo) {
            return res.status(404).json({ success: false, message: "Todo not found!" });
        }
        return res.status(201).json({ success: true, message: "Todo deleted successfully!" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Can't delete todo! SOmething went wrong." });
    }
});
exports.deleteTodos = deleteTodos;
const markAs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const markAs = updateProps.safeParse(req.body);
    if (!markAs.success) {
        return res.status(400).json({ success: false, message: markAs.error });
    }
    try {
        const todo = yield todoModel_1.default.findOneAndUpdate({ _id: id }, { done: markAs.data.done });
        if (!todo) {
            return res.status(404).json({ success: false, message: "Todo not found!" });
        }
        return res.status(201).json({ success: true, message: "Todo updated successfully!" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Can't update todo!. Something went wrong." });
    }
});
exports.markAs = markAs;
