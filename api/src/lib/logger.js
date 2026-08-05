const pino = require("pino");
const config = require("./config");

const logger = pino({
  formatters: {
    level: (label, number) => {
      return {
        level: label,
      };
    },
  },
}).child({
  service: config.get("build.service"),
  version: config.get("build.version"),
});

module.exports = logger;
