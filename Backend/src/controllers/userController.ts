import { NextFunction, Request, Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from '../utils/resoponseHandler'; 
import User from '../models/userSchema';
import CustomError from '../utils/customError';

export const getUserProfile = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const userId = req.user.id; 
    const userProfile = await User.findById(userId).select('-password'); 

    if (!userProfile) {
        throw new CustomError('User profile not found',404)
    }
  return sendSuccessResponse(res, userProfile);
  } catch (err) {
    next(err)
  }
};
