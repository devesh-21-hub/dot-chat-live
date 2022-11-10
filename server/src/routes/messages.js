const express = require("express");
const router = express.Router();
const { Message } = require("../models/Message");
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const auth = require("../auth/auth");

//const { io } = require("../../index");

// io.on("connection", (socket) => {
//   socket.on("typing").broadcast.emit("userIsTyping", "User is typing");
//socket.on("not-typing").broadcast.emit("userIsNotTyping", "User is typing");

//   console.log("Connected to socket");
// });

const multer = require("multer");
const sharp = require("sharp");
const { request } = require("express");

router.use((req, res, next) => {
  next();
});

//Send message

router.post("/messages", auth, async (req, res) => {
  const user = req.user;

  const { sender, receiver, text } = req.body;
  const message = { sender, receiver, text };
  const messageReceiver = await User.findOne({ username: receiver });
  const messageReceiverId = messageReceiver._id;

  const conversation = await Conversation.findOneAndUpdate(
    {
      members: { $in: [messageReceiverId] },
    },
    { $push: { messages: message } }
  );

  res.json({
    notification: `Message sent successfully to ${messageReceiver.name}`,
  });
});

//Get all messages in a conversation

router.get("/messages", auth, async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    const messageReceiver = await User.findOne({ username: receiver });
    const messageReceiverId = messageReceiver._id;

    const conversation = await Conversation.findOne({
      members: { $in: [req.user._id, messageReceiverId] },
    });

    res.json({ messages: conversation.messages });
  } catch (err) {
    res.json({ errors: err.message });
  }
});

//Delete a message

router.delete("/messages", auth, async (req, res) => {
  try {
    const { messageId } = req.body;
    const senderId = req.user._id;

    const conversationDocument = await Conversation.findOne({
      members: { $in: [req.user._id] },
    });

    const messageToDelete = conversationDocument.messages.id(messageId);

    if (messageToDelete.sender === req.user.username) {
      conversationDocument.messages.id(messageId).remove();
      await conversationDocument.save();
    } else {
      res.json({ message: "This message belongs to the other person." });
      return;
    }

    res.json({ message: "Message deleted successfully!" });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = router;

/*

person:1
{
  "name":"Person 1",
  "username":"person_1",
  "email":"person1@tm.com",
  "password":"person1@tm.com"  

  }

  {
    "_id": "63061a37e381f0997fdc6b89",
    "name": "User 69",
    "username": "person_1",
    "email": "person1@tm.com",
    "createdAt": "2022-08-24T12:31:51.971Z",
    "updatedAt": "2022-08-24T12:32:16.653Z",
    "__v": 1
}



Person: 2


{
    "savedUser": {
        "name": "Person 2",
        "username": "person_2",
        "email": "person2@tm.com",
        "_id": "630626b409783e2a8689dd07",
        "createdAt": "2022-08-24T13:25:08.528Z",
        "updatedAt": "2022-08-24T13:25:08.768Z",
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA2MjZiNDA5NzgzZTJhODY4OWRkMDciLCJpYXQiOjE2NjEzNDc1MDgsImV4cCI6MTY2
    MjU1NzEwOH0.fvbJGmqPWHxGKe6CJAoFNV6Asj5NUf_OyPXd6ghe-Oo"
}




{
    "conversation": {
        "_id": "63062b9959f479438f81d138",
        "members": [
            "630626b409783e2a8689dd07",
            "63061a37e381f0997fdc6b89"
        ],
        "messages": [],
        "createdAt": "2022-08-24T13:46:01.791Z",
        "updatedAt": "2022-08-24T13:46:01.791Z",
        "__v": 0
    }
}



*/
