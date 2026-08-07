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
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      levelFirst: true,
      translateTime: "HH:MM:ss",
      ignore: "pid,hostname",
    },
  },
}).child({
  service: config.get("build.service"),
  version: config.get("build.version"),
});

module.exports = logger;
