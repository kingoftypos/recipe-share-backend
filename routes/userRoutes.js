const express = require("express");
const cors = require("cors");
const router = express.Router();
const userMiddleware = require("../middlewares/userMiddleware");
const corsMiddelware = require("../middlewares/corsMiddleware");
const authController = require("../controllers/authController");
router.use(cors());


router.get("/", corsMiddelware, authController.protect, userMiddleware.getUser);
router.post("/register", corsMiddelware, userMiddleware.createUser);
router.post("/login", corsMiddelware, userMiddleware.loginUser);
router.post("/forget-password", corsMiddelware, userMiddleware.forgetPassword);
router.post(
  "/reset-password/:id/:token",
  corsMiddelware,
  userMiddleware.resetPassword
);

module.exports = router;
