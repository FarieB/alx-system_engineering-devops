const express = require('express');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.get('/protected-route', authenticate, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;

