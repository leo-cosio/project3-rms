const mongoose = require("mongoose");
const config = require("./config");
const logger = require("./logger");

mongoose
  .connect(config.get("db"))
  .then(() => logger.info("Successfully connected to the database"))
  .catch((error) => {
    logger.error("An error occurred connecting to the database", error);
    process.exit(0);
  });
