const jwt = require("jsonwebtoken");

class AuthController {
  async getToken(req, res) {
    try {
      //get the req.user from passport auth
      const body = {
        id: req.user._id,
      };

      //create jwt token
      const token = jwt.sign(
        {
          user: body,
        },
        process.env.JWT_SECRET
      );

      return res.status(200).json({
        message: "sukses",
        token,
      });
    } catch (e) {
      return res.status(500).json({
        message: "internal server error",
        error: e,
      });
    }
  }
}

module.exports = new AuthController();