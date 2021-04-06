const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { user } = require("../../models");
const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

//if user sign up
passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email", //usernamefield is from req.body.email
      passwordField: "password", //passwordfield is from req.body.password
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      //create user
      try {
        let userSignUp = await user.create(req.body);

        return done(null, userSignUp, {
          message: "user created",
        });
      } catch (e) {
        return done(null, false, {
          message: "cant create user",
        });
      }
    }
  )
);
