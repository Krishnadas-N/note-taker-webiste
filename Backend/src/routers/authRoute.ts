
import express, { Router } from 'express';
import { googleAuth } from '../controllers/authController';

const authRouter: Router = express.Router();

authRouter.post('/verfiy-token', googleAuth);

export default authRouter;

