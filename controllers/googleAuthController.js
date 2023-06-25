const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'iitmandi', {
    expiresIn: maxAge
  });
};
let newUser;
passport.use(new GoogleStrategy({
  clientID: "183702925686-d8abqnknae8frlmouqckssa5s99kncsf.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: '/user/auth/google/callback'
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Create or find the user in the database
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        // If the user exists, update the profile
        user.firstName = profile.name.givenName;
        user.lastName = profile.name.familyName;
        user = await user.save();
      } else {
        // Create a new user
        user = await User.create({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value
        });
      }
        newUser = user;
      
      done(null, user); // Pass the user object and token to the done function
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
  // Access the user object and token from the passport callback using req.user
    const token = createToken(newUser._id);


  // Set the cookie with the token
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
