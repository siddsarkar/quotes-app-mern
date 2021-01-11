/**
 * * Copyright ©2020 Siddhartha Sarkar. All Rights Reserved
 *
 * ? This source code is licensed under the MIT license found in the
 * ? LICENSE file in the root directory of this source tree.
 */

//base
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const crypto = require("crypto");

//load env. variables
require("dotenv").config();

//routes
const { articles, likes, users, comments } = require("./routes");

//env. vars.
const config = require("./config");

//multer
const MulterGridfsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const multer = require("multer");
const { isAuthenticated } = require("./utils");

//extract env. vars
const MONGODB_URI = config.mongodburi;
const PORT = process.env.PORT || 5000;

//connect to mongoDB
mongoose.connect(
  MONGODB_URI,
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) =>
    err ? console.log("MongoDB Error:", err) : console.log("MongoDB Connected")
);

// init gfs
let gfs;
mongoose.connection.once("open", () => {
  // init stream
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("uploads");
  // gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
  //   bucketName: "uploads",
  // });
});

// Storage
const storage = new MulterGridfsStorage({
  url: MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
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

// express routes
app.use("/api/likes", likes);
app.use("/api/articles", articles);
app.use("/api/users", users);
app.use("/api/comments", comments);

//for development
if (process.env.NODE_ENV === "development") {
  app.get("/", (req, res) => {
    res.json({ message: "welcome dev environmment" });
  });
}

//for production
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

app.post(
  "/upload/cover",
  isAuthenticated,
  upload.single("cover"),
  (req, res) => {
    // res.json({ message: "uploaded" });
    // console.log(req.file);
    res.json({ file: req.file });
  }
);

app.get("/image/:filename", (req, res) => {
  // console.log('id', req.params.id)
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "no files exist",
      });
    }
    gfs.createReadStream(file.filename).pipe(res);
  });
});

app.listen(PORT, () => {
  console.log("Server started at %d", PORT);
});
