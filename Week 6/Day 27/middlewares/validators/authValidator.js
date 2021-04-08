const validator = require("validator");

exports.signup = async (req, res, next) => {
  //check req.body.email is email

  let errors = [];
  if (!validator.isEmail(req.body.email)) {
    errors.push("email field must be valid");
  }

  if (!validator.isStrongPassword(req.body.password)) {
    errors.push("password must contain min 8 chars, min 1 UpperCase, min 1 LowerCase, 1 numb, 1 symbol");
  }

//check pasword confirmation
if(req.body.confirmPassword !== req.body.password){
    errors.push("password confirmation must be same to password");
}


  if(errors.length > 0){
      return res.status(400).json({
          message: errors.join(", "),
      });
  }

};
