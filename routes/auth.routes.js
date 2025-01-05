// routes/auth.js
const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const { validateUser,validatLogin }= require('../middlewares/validation.middleware');
const handleVaidation = require('../middlewares/handleValidation.middleware');
const router = express.Router();

router.post('/register',validateUser,handleVaidation, register);

router.post('/login',validatLogin,handleVaidation, login);

module.exports = router;
