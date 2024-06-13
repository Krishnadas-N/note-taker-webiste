import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './config/mongooseConnection';
import { sendErrorResponse } from './utils/resoponseHandler';
import CustomError from './utils/customError';
import passport from './config/passportConfig';
dotenv.config();
import admin from 'firebase-admin';
import authRouter from './routers/authRoute';
const app = express();
const PORT = process.env.PORT || 3000;

const serviceAccountJson = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);
if (!serviceAccountJson) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set');
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountJson),
});

app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDb()

// app.use(passport.initialize());

app.use('/auth',authRouter)

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    if (err instanceof CustomError) {
     return sendErrorResponse(res, err.message, err.statusCode);
    } else {
     return  sendErrorResponse(res, 'Internal Server Error');
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
