import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Request } from 'express';
import User,{IUser} from '../models/userSchema'; 
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './secrets';


passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err: Error, user: boolean | Express.User | null | undefined) => {
      console.log()
      done(err, user);
    });
  });
  
  
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL!
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser: IUser = new User({
      googleId: profile.id,
      username: profile.displayName!,
      email: profile.emails![0].value
    });

    await newUser.save();
    done(null, newUser);
  } catch (error) {
   done(error, error? false : User);
  }
}));

export default passport;