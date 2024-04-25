const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const cookieParser = require("cookie-parser");

exports.protect = async (req, res, next) => {
  let token;
  token = req.cookies.token;

  if (token) {
    let decoded;

    jwt.verify(token, process.env.JWT_SECRET, (err, tokenRes) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          res.status(401);
          throw new Error("Unauthorized- Token has expired");
        }
        return res.status(401).json({ message: "token expired" });
      }
      decoded = tokenRes;
    });
    console.log(decoded.id);
    const user = await User.findById(decoded.id);

    if (user) {
      req.user = user;
    } else {
      res.status(401);
      throw new Error("Unauthorized - user not found");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized - No token");
  }
  next();
};
