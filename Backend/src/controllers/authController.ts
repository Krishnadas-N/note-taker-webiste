import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import admin from 'firebase-admin';

export const googleAuth = (req: Request, res: Response,next:NextFunction) => {
  try{
   const userData = req.body 
   console.log(userData)
  }catch(err){
    next(err)
  }
};

