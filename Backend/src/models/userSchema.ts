import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  googleId: string;
  refreshToken?: string;
}


const UserSchema: Schema = new Schema({
  profileImage:{
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
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  googleId: String,
  refreshToken: String,
});

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;
