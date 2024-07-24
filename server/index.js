const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const app = express();

const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://skn8454:saka123@cluster0.in6mqqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = process.env.PORT || 4000;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(mongoURI)
  .then(() => console.log("DB connected!"))
  .catch((error) => console.error("DB connection error:", error));

const salt = bcrypt.genSaltSync(10);
const SECRET_KEY = "2h32jk24g3h43hjvvj4g4cvrhy43u4hkghek";

// Register route
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);
    const userDoc = await User.create({ username, password: hashedPassword });
    res.json({ message: "User created successfully!", user: userDoc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });

    if (!userDoc) {
      return res.status(400).json({ error: "User not found" });
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({ username, id: userDoc._id }, SECRET_KEY, {}, (err, token) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.cookie("token", token, { httpOnly: true }).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware to check JWT
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

// Check profile route
app.get("/profile", authenticateToken, (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, SECRET_KEY, {}, (err, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(info);
  });
});

// Logout route
app.post("/logout", (req, res) => {
  res
    .cookie("token", "", { httpOnly: true, expires: new Date(0) })
    .json({ message: "Logged out" });
});

// create a new post

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
  });

  res.json({ postDoc });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
