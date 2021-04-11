const log4js = require("log4js");
const levels = require("log4js/lib/levels.js")().levels;
const config = require("../../config/log4js.config.js");
let console, system, application, access;

log4js.configure(config);

console = log4js.getLogger();
system = log4js.getLogger("system");
access = log4js.getLogger("access");

const ApplicationLogger = function () {
  this.logger = log4js.getLogger("application");
};
const proto = ApplicationLogger.prototype;
for (let level of levels) {
  level = level.toLowerCase();
  proto[level] = (function (level) {
    return function (key, msg) {
      let logger = this.logger;
      logger.addContext("key", key);
      logger[level](msg);
    };
  })(level);
}
application = new ApplicationLogger();

module.exports = {
  console,
  system,
  application,
  access,
};
