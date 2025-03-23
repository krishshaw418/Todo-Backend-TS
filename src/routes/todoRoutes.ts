import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
import { addTodos, deleteTodos, getTodos, markAs } from "../controllers/todoControllers";

const router = Router();

router.post(`/add-todo`, verifyToken, addTodos);
router.get(`/`, verifyToken, getTodos);
router.delete(`/delete-todo/:id`, verifyToken, deleteTodos);
router.put(`/mark-as/:id`, verifyToken, markAs);

export default router;