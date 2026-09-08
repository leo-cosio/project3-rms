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

//? Authentication

module.exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return next(createHttpError(401, ERROR_LOGIN_INVALID));
  }

  const match = user.checkPassword(password);

  if (!match) {
    return next(createHttpError(401, ERROR_LOGIN_INVALID));
  }

  req.session.userId = user.id;

  res.json({ data: user });
};

module.exports.logout = async (req, res, next) => {
  req.session.destroy();

  res.status(204).send();
};

module.exports.me = (req, res, next) => {
  res.status(200).json({ data: req.user });
};

//? CRUD

module.exports.list = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const { username, type, password } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists) {
      return next(createHttpError(409, ERROR_USER_ALREADY_EXIST));
    }

    const user = await User.create({
      username,
      type,
      password,
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOneAndUpdate({ username }, req.body, {
      runValidators: true,
      returnDocument: "after",
    }).select("-password");

    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.remove = async (req, res, next) => {
  try {
    const { username } = req.params;

    if (req.user.username === username) {
      return next(createHttpError(400, "You cannot delete your own user"));
    }

    const user = await User.findOneAndDelete({ username });

    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
