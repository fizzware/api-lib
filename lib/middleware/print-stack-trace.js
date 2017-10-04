const printStackTrace = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });

  next();
};

module.exports = printStackTrace;
