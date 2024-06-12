import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './config/mongooseConnection';
import { sendErrorResponse } from './utils/resoponseHandler';
import CustomError from './utils/customError';
import passport from './config/passportConfig';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDb()

app.use(passport.initialize());

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
