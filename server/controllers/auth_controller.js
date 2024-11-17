const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      username,
      password,
    });

    return res.status(201).json({
      id: user._id,
      username: user.username,
      token: generateToken(user._id),
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed: " + error.message,
      });
    } else {
      return res.status(500).json({
        message: "Server error, Unable to register user",
      });
    }
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "error.message",
    });
  }
};

module.exports = { registerUser, loginUser };
