const User = require("../models/userSchema");

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.find({ email });
    if (user) {
      res.status(400).json("User already exists");
    }
    const newUser = await new User({
      name,
      email,
      password,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
