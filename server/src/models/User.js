const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Conversation = require("./Conversation");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(
            "Invalid email address, please enter a valid email address"
          );
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password should not be password ");
        }
      },
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    profilePic: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("conversations", {
  ref: "Conversation",
  localField: "_id",
  foreignField: "owner",
});

UserSchema.pre("remove", async function (next) {
  const user = this;
  await Conversation.deleteMany({ owner: user._id });
  next();
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "2 weeks",
  });

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  delete userObject.video;

  return userObject;
};

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user)
    throw new Error("User with the username " + username + " not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) return user;
  else throw new Error("Incorrect password");
};
/*
UserSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});


*/

const User = mongoose.model("User", UserSchema);

module.exports = User;
