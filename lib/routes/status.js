const router = require('express').Router();

router.get('/', (req, res) => {
  const status = {
    environment: process.env.NODE_ENV
  };

  res.send(status).end();
});

module.exports = router;
