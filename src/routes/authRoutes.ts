import { Router } from 'express';
import { signUp, signIn, logout, getUserData } from '../controllers/authControllers';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.post(`/signup`, signUp);
router.post(`/signin`, signIn);
router.post(`/logout`, logout);
router.get(`/user/data`, verifyToken, getUserData);

export default router;