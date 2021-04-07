const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");

//import validator

//import controller
// const authController = require("../controllers/authController");

//import auth middleware
const auth =  require("../middlewares/auth");
//make router
const router = express.Router();

router.post("/signup", auth.signup, authController.getToken);

module.exports = router;
