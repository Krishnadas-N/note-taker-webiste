import { NextFunction, Request, Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from '../utils/resoponseHandler'; 
import User from '../models/userSchema';
import CustomError from '../utils/customError';
import  Note, { INote } from '../models/notesSchema';

export const getUserProfile = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const userId = req.user; 
    const userProfile = await User.findById(userId).select('-password'); 

    if (!userProfile) {
        throw new CustomError('User profile not found',404)
    }
  return sendSuccessResponse(res, userProfile);
  } catch (err) {
    next(err)
  }
};

export const addNote = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const user = req.user
    console.log(req.user,req.body)
    const { title, editorContent } = req.body;

    console.log(title, editorContent,user)
    const newNote = new Note({ title, content:editorContent ,user});
    await newNote.save();
    return sendSuccessResponse(res, 'Note added successfully',201);
  } catch (error) {
    next(error)
  }
};

export const getUserNotes = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const user = req.user
    const notes = await  Note.find({user:user})
    return sendSuccessResponse<INote[]>(res, notes,201);
  } catch (error) {
    next(error)
  }
};
