const createHttpError = require("http-errors");
const User = require("../lib/models/user.model");

module.exports.auth = async (req, res, next) => {
  if (!req.session.userId) {
    return next(createHttpError(401, "session not found"));
  }

  const user = await User.findById(req.session.userId);

  if (!user) {
    return next(createHttpError(401, "session user not found"));
  }

  req.user = user;
  next();
};
