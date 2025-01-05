const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAuthToken = (user) => {
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '8h' });
  return token;
};

module.exports = generateAuthToken;
