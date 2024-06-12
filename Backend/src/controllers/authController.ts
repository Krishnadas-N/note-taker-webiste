import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const googleAuth = (req: Request, res: Response) => {
  // Handle Google authentication
};

export const googleAuthCallback = (req: Request, res: Response) => {
    const user = req.user as any;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.redirect(`http://localhost:4200/login-success?token=${token}`);
};
