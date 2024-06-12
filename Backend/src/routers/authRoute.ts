
import express, { Router } from 'express';
import { googleAuth, googleAuthCallback } from '../controllers/authController';

const router: Router = express.Router();

router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);

export default router;

