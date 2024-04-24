const express = require("express");
const cors = require("cors");
const router = express.Router();
const userMiddleware = require("../middlewares/userMiddleware");

router.use(cors());

router.post("/register", userMiddleware.createUser);
router.post("/login",userMiddleware.loginUser);
router.post("/forget-password",userMiddleware.forgetPassword);
router.post("/reset-password/:id/:token",userMiddleware.resetPassword);

module.exports = router;
