import { Request, Response } from "express";
import Todo from "../models/todoModel";
import { z } from "zod";

const todoProps = z.object({
    title: z.string(),
    description: z.string(),
})

const updateProps = z.object({
    done: z.boolean(),
})

export const addTodos = async(req: Request, res: Response): Promise<any> => {
    const todo = todoProps.safeParse(req.body);
    if(!todo.success){
        return res.status(400).json({success: false, message: todo.error});
    }
    try {
        const newTodo = new Todo({title: todo.data.title, description: todo.data.description, userId: req.userId});
        const newDoc = await newTodo.save();
        res.status(200).json({sucsess: true, message: newDoc._id});
    } catch (error) {
        console.error(error);
        return res.status(500).json({succes: false, message: "Can't create new todo. Something went wrong!"});
    }
}

export const getTodos = async(req: Request, res: Response): Promise<any> => {
    try {
        const todos = await Todo.find({userId: req.userId});
        if(!todos){
            return res.json({success: false, message: "No todos to show yet!"});
        }
        return res.status(201).json({success: true, data: todos});
    } catch (error) {
        console.error(error);
        return res.json({success: false, message: "Can't get todos! Something went wrong."});
    }
}

export const deleteTodos = async(req: Request, res: Response): Promise<any> => {

    const id = req.params.id;

    try {
        const todo = await Todo.findOneAndDelete({_id: id});
        if(!todo){
            return res.status(404).json({success: false, message: "Todo not found!"});
        }
        return res.status(201).json({success: true, message: "Todo deleted successfully!"});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({success: false, message: "Can't delete todo! SOmething went wrong."});
    }
}

export const markAs = async(req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const markAs = updateProps.safeParse(req.body);
    if(!markAs.success){
        return res.status(400).json({success: false, message: markAs.error});
    }
    try {
        const todo = await Todo.findOneAndUpdate({_id: id}, {done: markAs.data.done});
        if(!todo){
            return res.status(404).json({success: false, message: "Todo not found!"});
        }
        return res.status(201).json({success: true, message: "Todo updated successfully!"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: "Can't update todo!. Something went wrong."});
    }
}