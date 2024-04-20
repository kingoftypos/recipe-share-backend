const express = require("express");
const env = require("dotenv");
const connectDb = require("./config/dbConfig");

env.config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
