const jwt = require("jsonwebtoken");

const User = require("../../models/User");

const auth = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.header("Authorization").replace("Bearer ", "");

    const decode = jwt.verify(token, process.env.JWT_SECRET); // decode is an object containing all properties that we have set as payload
    //Find the user having the id as in the decode object and whose token still present in the user document

    const user = await User.findOne({ _id: decode._id, "tokens.token": token });

    if (!user) {
      throw new Error("Couldn't find user");
    }

    //Find the token associated to the user from the request header and save it to req.token

    req.token = token;

    //By writing this line we don't need to again find the user from database
    req.user = user; //We can use this user object in the route handler

    //Run the next functions after the middleware
    next();
  } catch (e) {
    res
      .status(401)
      .json({ message: "Can't authenticate user", error: e.message });
  }
};

module.exports = auth;
