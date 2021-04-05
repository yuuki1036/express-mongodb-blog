const path = require("path");
const ROOT = path.join(__dirname, "../");

module.exports = {
  appenders: {
    ConsoleLogAppender: {
      type: "console",
    },
    FileLogAppender: {
      type: "file",
      filename: path.join(ROOT, "./log/system/sytem.log"),
      maxLogSize: 5000000,
      backup: 10,
    },
    MultiFileLogAppender: {
      type: "multifile",
      base: path.join(ROOT, "./log/application/"),
      property: "key",
      extension: ".log",
    },
  },
  categories: {
    default: {
      appenders: ["ConsoleLogAppender"],
      level: "ALL",
    },
    system: {
      appenders: ["FileLogAppender"],
      level: "ERROR",
    },
    application: {
      appenders: ["MultiFileLogAppender"],
      level: "ERROR",
    },
  },
};
