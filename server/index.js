const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express();

const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://skn8454:saka123@cluster0.in6mqqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Register route
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.create({ username, password });
    res.json({ message: "User created successfully!", user: userDoc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
