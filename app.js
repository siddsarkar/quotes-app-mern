const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const articles = require("./routes/articlesRoute.js");
const users = require("./routes/usersRoute.js");
const config = require("./config.js");
const { error } = require("console");

const MONGODB_URI = config.mongodburi;
const PORT = process.env.PORT || 5000;
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => console.log("MongoDB Connected", err)
);

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/public")));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/api", (req, res) => {
  // res.sendFile(path.join(__dirname, "/client/public/index.html"));
  res.send({ message: "welcome to api" });
});

app.use("/api/articles", articles);
app.use("/api/users", users);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
