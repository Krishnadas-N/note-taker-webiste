import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";
import { AuthResponseData, GoogleCredentials } from "../dtos/auth.model";
import User, { IUser } from "../models/userSchema";
import {  generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwtTokenGenerator";
import { sendSuccessResponse ,sendErrorResponse} from "../utils/resoponseHandler";

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData: GoogleCredentials = req.body;
    const token = userData.stsTokenManager.accessToken;
    const ticket = await admin.auth().verifyIdToken(token);
    const { uid, email } = ticket;
    let user: IUser | null = await User.findOne({ googleId: uid });
    if (!user) {
      user = new User({
        googleId: uid,
        email,
        username: userData.displayName,
        profileImage: userData.photoURL,
        createdAt: new Date(),
      });
      await user.save();
    }
    console.log("Log from Login ", user);
    const  authToken =  generateAccessToken(user._id as string);
    const refreshToken  = generateRefreshToken(user._id as string);
    user.refreshToken = refreshToken;
    await user.save();
    console.log("User logged in:", user);
    return sendSuccessResponse<AuthResponseData>(
      res,
      { token: authToken, refreshToken },
      201
    );
  } catch (err) {
    next(err);
  }
};



export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return sendErrorResponse(res, 'Refresh token required', 401);
    }

    let userDetail: IUser | null = await User.findOne({ refreshToken: refreshToken });

    if (!userDetail) {
      return sendErrorResponse(res, 'Invalid refresh token', 401);
    }

    const payload = verifyToken(refreshToken);

    if (!payload) {
      return sendErrorResponse(res, 'Invalid refresh token', 401);
    }

    const accessToken = generateAccessToken(userDetail._id as string);
    return sendSuccessResponse<Omit<AuthResponseData,'token'>>(
      res,
      {  refreshToken:accessToken },
      201
    );
  } catch (err) {
    console.error('Error in refreshToken:', err);
    next(err)
  }
};