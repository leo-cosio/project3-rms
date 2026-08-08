const createHttpError = require("http-errors");
const User = require("../lib/models/user.model");

const ERROR_USER_ALREADY_EXIST = {
  message: "User validation fails",
  errors: {
    username: "Username already exists",
  },
};

const ERROR_LOGIN_INVALID = {
  message: "User login fails",
  errors: {
    password: "Invalid username or password",
  },
};

// Authentication

module.exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) return next(createHttpError(401, ERROR_LOGIN_INVALID));

  const match = user.checkPassword(password);
  if (!match) return next(createHttpError(401, ERROR_LOGIN_INVALID));
  req.session.userId = user.id;

  res.json(user);
};

module.exports.logout = async (req, res, next) => {
  req.session.destroy();
  res.status(204).send();
};

// Create and delete

module.exports.create = async (req, res, next) => {
  const { username, type, password } = req.body;
  const newUser = {
    username,
    type,
    password,
  };

  const userExists = await User.findOne({ username });

  if (userExists) {
    return next(createHttpError(409, ERROR_USER_ALREADY_EXIST));
  } else {
    const user = await User.create(newUser);
    delete user.password;
    res.status(201).json(user);
  }
};

module.exports.remove = async (req, res, next) => {
  const { username } = req.params;

  const user = await User.findOneAndDelete({ username });
  console.log(user);
  if (user) res.status(204).send();
  else next(createHttpError(404, "User not found"));
};
