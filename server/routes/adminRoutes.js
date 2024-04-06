
const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Now check with the database
});

module.exports = router;
