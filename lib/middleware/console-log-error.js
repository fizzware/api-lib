/* eslint-disable no-console */

const consoleLogError = (err, req, res, next) => {
  console.error(err);
  next();
};

module.exports = consoleLogError;
