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

module.exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) return next(createHttpError(401, ERROR_LOGIN_INVALID));

  const match = user.checkPassword(password);
  if (!match) return next(createHttpError(401, ERROR_LOGIN_INVALID));
  console.log(req.session.userId);
  req.session.userId = user.id;

  res.json(user);
};
