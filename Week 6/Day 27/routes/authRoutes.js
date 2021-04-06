const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");

//import validator

//import controller
const AuthController = require("../controllers/authController");

//import auth middleware
require("../middlewares/auth");
//make router
const router = express.Router();

router.post(
  "/signup",
  async (req, res, next) => {
    passport.authenticate("signup", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({
          message: " internal server error",
          error: err,
        });
      }

      //if user doesnt exist
      if (!user) {
        return res.status(401).json({
         
          message: info.message,
        });
      }
      //make req.user exist
      req.user = user;

      next();
    })(req, res, next);
  },
  authController.getToken
);

module.exports = router;
