const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const auth = require("../auth/auth");

const multer = require("multer");
const sharp = require("sharp");

router.use((req, res, next) => {
  next();
});

//Create a new Conversation/Contact/Chat

router.post("/create-conversation", auth, async (req, res) => {
  try {
    const hostId = req.user._id;
    const { guestUsername } = req.body;
    const guest = await User.findOne({ username: guestUsername });
    const guestId = guest._id;
    const receiver = { username: guestUsername, name: guest.name };

    const existingConversation = await Conversation.findOne({
      members: { $in: [guestId] },
    });

    if (!existingConversation) {
      const conversation = new Conversation({
        owner: hostId,
        members: [hostId, guestId],
        user1: { username: req.user.username, name: req.user.name },
        user2: receiver,
      });

      const savedConvo = await conversation.save();
      res.json({ notification: `You added ${guestUsername} to your contacts` });
    } else {
      res.json({
        notification: `${guestUsername} is already in your contacts`,
      });
    }
  } catch (err) {
    console.error(err);
  }
});

//Get all chats/conversations of a user

router.get("/conversations", auth, async (req, res) => {
  const user = req.user;
  const conversations = await Conversation.find({
    members: { $in: [user._id] },
  });
  res.json({ conversations });
});

module.exports = router;
