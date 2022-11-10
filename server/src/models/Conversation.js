const mongoose = require("mongoose");
const { MessageSchema } = require("./Message");
const User = require("./User");

const ConversationSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    members: {
      type: Array,
    },
    user1: {
      username: {
        type: String,
      },
      name: {
        type: String,
      },
    },
    user2: {
      username: {
        type: String,
      },
      name: {
        type: String,
      },
    },
    messages: {
      type: [MessageSchema],
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
