const config = require("./config");
const session = require("express-session");
const MongoStore = require("connect-mongo").MongoStore;

module.exports = session({
  secret: config.get("session.secret"),
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    secure: config.get("session.secure"),
  },
});
