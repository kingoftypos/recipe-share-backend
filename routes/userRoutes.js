const express = require("express");
const cors = require("cors");
const router = express.Router();
const userMiddleware = require("../middlewares/userMiddleware");

router.use(cors());

router.post("/register", userMiddleware.createUser);

module.exports = router;
