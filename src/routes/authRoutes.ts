import { Router } from 'express';
import { signUp, signIn, logout } from '../controllers/authControllers';

const router = Router();

router.post(`/signup`, signUp);
router.post(`/signin`, signIn);
router.post(`/logout`, logout);

export default router;