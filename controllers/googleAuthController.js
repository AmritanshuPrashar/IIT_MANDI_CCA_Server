const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: maxAge
  });
};
let newUser;
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        user.firstName = profile.name.givenName;
        user.lastName = profile.name.familyName;
        user = await user.save();
      } else {
        user = await User.create({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value
        });
      }
        newUser = user;
      
      done(null, user); 
    } catch (err) {
      done(err);
    }
  }
));
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Controller actions
const signin = passport.authenticate('google', { scope: ['profile', 'email'] });

const signinCallback = passport.authenticate('google', { failureRedirect: '/login' });

const dashboard = (req, res) => {
    const token = createToken(newUser._id);


  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

  res.status(201).json({
    message: "Login Successful!",
    user: newUser
  });
};

module.exports = {
  signin,
  signinCallback,
  dashboard,
};