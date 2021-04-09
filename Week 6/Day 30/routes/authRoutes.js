const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const authValidator = require("../middlewares/validators/authValidator");
const auth =  require("../middlewares/auth");
//import validator

//import controller
// const authController = require("../controllers/authController");

//import auth middleware
//make router
const router = express.Router();

router.post("/signup", authValidator.signup, auth.signup, authController.getToken);
router.post("/signin",authValidator.signin, auth.signin, authController.getToken);

module.exports = router;
