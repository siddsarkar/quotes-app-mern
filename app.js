const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

//routes import
const articles = require("./routes/articlesRoute.js");
const users = require("./routes/usersRoute.js");
const comments = require("./routes/commentsRoute");
const likes = require("./routes/likesRoute");

const config = require("./config.js");
const { error } = require("console");

const MONGODB_URI = config.mongodburi;
const PORT = process.env.PORT || 5000;
mongoose.connect(
  MONGODB_URI,
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => console.log("MongoDB Connected", err)
);

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));
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

app.use("/api/likes", likes);
app.use("/api/articles", articles);
app.use("/api/users", users);
app.use("/api/comments", comments);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
