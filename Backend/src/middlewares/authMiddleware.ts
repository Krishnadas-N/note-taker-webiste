import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema'; 
import { sendErrorResponse } from '../utils/resoponseHandler';


export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]
  console.log(req.headers['authorization'])
    if (!token) {
       return sendErrorResponse(res, 'Authentication token missing',401)
    }
  
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      const user = await User.findById(decoded.userId);
  
     
      if (!user) {
        return sendErrorResponse(res, 'User not found or unauthorized', 401);
    }
  
      req.user = user;
      next();
    } catch (err: unknown) {
        if (err instanceof jwt.TokenExpiredError) {
            return sendErrorResponse(res, 'Token expired', 401);
        } else if (err instanceof jwt.JsonWebTokenError) {
            return sendErrorResponse(res, 'Invalid token', 401);
        } else {
            return sendErrorResponse(res, 'Not authorized to access this resource', 401);
        }
    }
  };