const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExists = await authModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message:
        isUserExists.email == email
          ? "user already exists"
          : "username already taken",
    });
  }

  const hash = await bcrypt.hash(password, 12);

  const user = await authModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRETS,
    { expiresIn: "1h" },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "user register successfully",
    user: {
      username: user.username,
    },
  });
};

const loginController = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExists = await authModel
    .findOne({
      $or: [{ email }, { username }],
    })
    .select("+password");

  if (!isUserExists) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExists.password,
  );

  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: isUserExists._id,
    },
    process.env.JWT_SECRETS,
    { expiresIn: "1h" },
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "user login successfully",
  });
};

const meController = async (req, res) => {
  const userId = req.user.id;

  const user = await authModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "user not exists",
    });
  }

  return res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
    },
  });
};

const logoutController = async (req, res) => {
  const token = req.cookies.token;

  res.clearCookie("token");

  await redis.set(token, Date.now().toString(), "EX", 60 * 60);

  res.status(201).json({
    message: "logout successfully",
  });
};

module.exports = {
  registerController,
  loginController,
  meController,
  logoutController,
};
