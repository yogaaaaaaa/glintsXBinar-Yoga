const passport = require("passport"); //import passport
const LocalStrategy = require("passport-local").Strategy; //import localstrategy
const { user } = require("../../models"); //import user model
const bcrypt = require("bcrypt"); //import bcrypt (encrypt and comparePassword)
const JWTStrategy = require("passport-jwt").Strategy; //impoer jwt strategy
const ExtractJWT = require("passport-jwt").ExtractJwt; // impoer extractJWT

//if user call this passport
exports.signup = (req, res, next) => {
  //it will go to ../middlewares/auth/index.js -> passport.user("signup")
  passport.authenticate("signup", { session: false }, (err, user, info) => {
    //after go to ../middlewares/auth/index.js -> passport.user("signup")
    //it will bring the variable from done() function
    // like err = null, user = false, info = {message: "user cant be created"}
    //or err = null, user = userSignUp, info =  {message: "user cant be created"}
    
    // if error
    if (err) {
      return res.status(500).json({
        message: " internal server error",
        error: err,
      });
    }

    //if user is false
    if (!user) {
      return res.status(401).json({
       
        message: info.message,
      });
    }
    //make req.user that will save the user value
    // and it will bring to controller
    req.user = user;

    //next to authController.getToken
    next();
  })(req, res, next);
}


passport.use(
  "signup",
  new LocalStrategy(
     {
      usernameField: "email", //usernamefield is from req.body.email
      passwordField: "password", //passwordfield is from req.body.password
      passReqToCallback: true, // enable to read req.body/req.params/req.query
    },
    async (req, email, password, done) => {
      
      try {
        //after user call this passport
        //it will run this method and create the user depends on req.body
        let userSignUp = await user.create(req.body);

        //fi  create user success, it will make
        //err=null
        //user = userSignUp
        //info = {message: "user created"}

        return done(null, userSignUp, {
          message: "user created",
        });
      } catch (e) {
        //if create user failed, it will make
        //err = null
        //user = false
        //info = {message: "user cant be craeted"}
        return done(null, false, {
          message: "cant create user",
        });
      }
    }
  )
);
