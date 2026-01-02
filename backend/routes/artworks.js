const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Artwork = require("../models/Artwork");
const auth = require("../middleware/auth"); // JWT middleware

// Multer setup
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// 🔹 Upload artwork (authenticated)
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });

    const newArtwork = new Artwork({
      imageUrl: `/uploads/${req.file.filename}`,
      user: req.user.id // logged-in user from JWT
    });

    const savedArt = await newArtwork.save();
    res.status(201).json(savedArt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// 🔹 Get artworks of logged-in user
router.get("/user", auth, async (req, res) => {
  try {
    const art = await Artwork.find({ user: req.user.id });
    res.json(art);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user artworks" });
  }
});

// 🔹 Get all artworks (Landing page)
router.get("/all", async (req, res) => {
  try {
    const artworks = await Artwork.find().populate("user", "username");
    res.json(artworks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch artworks" });
  }
});

// 🔹 Get by username (Public profile)
router.get("/user-by-name/:username", async (req, res) => {
  try {
    const User = require("../models/User");
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const art = await Artwork.find({ user: user._id });
    res.json(art);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch artworks" });
  }
});

module.exports = router;
