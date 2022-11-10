const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../auth/auth");

const multer = require("multer");
const sharp = require("sharp");

router.use((req, res, next) => {
  next();
});

//Signup

router.post("/signup", async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const user = { username, name, email, password };
    const newUser = new User(user);
    const userData = await newUser.save();
    console.log(user);

    const token = await userData.generateAuthToken();
    res.status(201).json({ userData, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err.message);
  }
});

//Login
router.post("/users/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByCredentials(username, password);
    const token = await user.generateAuthToken();
    user
      ? res.status(200).send({ user, token })
      : res.status(404).json({ message: "Can't find user" });
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log(err);
    return;
  }
});

//Update User

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "username", "email", "password"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid property update" });
  }
  const userId = req.params.userId;
  const properties = req.body; // properties to update
  try {
    updates.forEach((update) => (req.user[update] = properties[update]));
    await req.user.save();

    req.user === null
      ? res.status(404).json({ message: "User not found" })
      : req.user === undefined
      ? res.status(400).json({ message: "User id is invalid" })
      : res.json(req.user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    //In the tokens array remove that token which is just stored in req.token in auth then save the user
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.status(200).json({ message: "User logged out" });
  } catch (err) {
    res.status(500).json({ message: "Some thing went wrong" });
  }
});

//Get profile

router.get("/users/me", auth, (req, res) => {
  res.json({ user: req.user });
});

//Delete Account

router.delete("/users/me", auth, async (req, res) => {
  try {
    const result = await req.user.remove();

    result === null
      ? res.status(404).json({ message: "User not found" })
      : result === undefined
      ? res.status(400).json({ message: "Invalid user-id" })
      : res
          .status(200)
          .json({ user: req.user, message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});

//File uploads

//limit filesize to 2 mb

const upload = multer({
  dest: "public/pdfs",
  limits: {
    filesize: 2000000,
  },
  fileFilter(req, file, cb) {
    //endsWith(".pdf")
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("Please provide a pdf file"));
    }
    //Accept the file
    cb(null, true);
  },
});

const uploadAvatar = multer({
  limits: {
    filesize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(new Error("Image format should be jpg, png, or jpeg"));

    cb(null, true);
  },
});

const uploadVideo = multer({
  limits: {
    filesize: 10000000,
  },
});

//multer will receive the file(s) from the input field with name picture and will save it to images folder
router.post(
  "/users/uploads",
  upload.single("picture"),
  (req, res) => {
    res.status(200).json({ message: "Image uploaded successfully" });
  },
  (err, req, res, next) => {
    res
      .status(400)
      .json({ error: err.message, message: "Something went wrong" });
  }
);

router.post(
  "/users/me/avatar",
  auth,
  uploadAvatar.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize(180, 180)
      .png()
      .toBuffer();
    //req.user.avatar = req.file.buffer;

    req.user.avatar = buffer;

    await req.user.save();

    res.status(200).json({ message: "Avatar uploaded successfully" });
  },
  (err, req, res, next) => {
    res
      .status(400)
      .json({ error: err.message, message: "Something went wrong" });
  }
);

// Upload video

router.post(
  "/users/me/videos",
  auth,
  uploadVideo.single("video"),
  async (req, res) => {
    req.user.video = req.file.buffer;
    await req.user.save();
    res.status(200).json({ message: "Video uploaded successfully" });
  },
  (err, req, res, next) => {
    res
      .status(400)
      .json({ error: err.message, message: "Something went wrong" });
  }
);

module.exports = router;
