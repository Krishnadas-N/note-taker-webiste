
import express, { Router } from 'express';
import { addNote, getUserNotes } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const userRouter: Router = express.Router();

userRouter.post('/add-notes',authenticateJWT, addNote)

userRouter.get('/get-notes',authenticateJWT, getUserNotes)

export default userRouter;

