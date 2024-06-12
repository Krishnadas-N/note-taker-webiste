import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  googleId: string;
}


const UserSchema: Schema = new Schema({
  profile:{
        type:String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  googleId: String,
});

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;
