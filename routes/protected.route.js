const express = require('express');
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize.middleware');

const router = express.Router();

router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Welcome to the admin panel!' });
});

module.exports = router;
