const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    receiver: {
      type: String,
    },
    text: {
      type: String,
      trim: true,
    },
    image: {
      type: Buffer,
    },
    video: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = { Message, MessageSchema };
