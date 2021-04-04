const logger = require("./logger.js").system;

module.exports = () => {
  return (err, req, res, next) => {
    logger.error(err.message);
    next(err);
  };
};
