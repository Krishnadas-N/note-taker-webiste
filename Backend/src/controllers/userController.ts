import { NextFunction, Request, Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from '../utils/resoponseHandler'; 
import User, { IUser } from '../models/userSchema';
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

export const getNoteDetails = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const noteId = req.params.noteId
    const user = req.user
    const note = await  Note.findOne({user:user,_id:noteId}) as INote
    return sendSuccessResponse<INote>(res, note,201);
  } catch (error) {
    next(error)
  }
};

export const deleteNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const noteId = req.params.noteId; 
    const user = req.user;
     await Note.findByIdAndDelete({ _id: noteId });

     return sendSuccessResponse<{}>(res, {}, 200);
  } catch (error) {
    next(error); 
  }
};


export const getCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
  const user = req.user;
   const currentUser = await User.findById(user)

    return sendSuccessResponse<IUser>(res, currentUser as IUser, 200);
  } catch (error) {
    next(error); 
  }
};


