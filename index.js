const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/dbConfig");

const corsMiddleware = require("./middlewares/corsMiddleware");

const recipeRoute = require("./routes/recipeRoutes");
const userRoute = require("./routes/userRoutes");

env.config();

connectDb();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(corsMiddleware);

app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "https://recipe-share-frontend.vercel.app",

    credentials: true,
  })
);

app.get("/", (req, res, next) => {
  res.json({
    message: "Api is running",
  });
});
app.use("/v1/api/recipe", recipeRoute);
app.use("/v1/api/user", userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
