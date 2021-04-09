const jwt = require("jsonwebtoken");//import jsonwebtoken

class AuthController {
  async getToken(req, res) {
    try {
      //get the req.user from authRoutes
      // amd create body variable
      const body = {
        id: req.user._id,
        //  role: req.user.role,
        //  nama: req.user.nama,
      };

      //create jwt token with  {user{id: req.user._id}}value
      //and the key is porcess.env.JWT_SECRET
      const token = jwt.sign(body, process.env.JWT_SECRET);
        //if success
      return res.status(200).json({
        message: "sukses",
        token,
      });
    } catch (e) {
      //if error
      return res.status(500).json({
        message: "internal server error",
        error: e,
      });
    }
  }
}

module.exports = new AuthController();