const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  // console.log("Cookies: ", req.cookies); // Debugging statement

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - token not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ error: "Unauthorized - Token has expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }

    res.locals.id = decoded.id;
    next();
  });
};
