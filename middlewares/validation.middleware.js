const { body } = require('express-validator');


exports.validateUser = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isString().withMessage('Username must be a string')
    .isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
  
  body('email')
    .notEmpty().withMessage('Email is required')
    .isString().withMessage('Email must be a string')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  body('role')
    .notEmpty().withMessage('Role is required')
    .isString().withMessage('Role must be a string')
    .isIn(['admin', 'user']).withMessage('Invalid role name'),
];


exports.validatLogin = [
    body('username')
      .notEmpty().withMessage('Username is required')
      .isString().withMessage('Username must be a string')
      .isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
    
    body('password')
      .notEmpty().withMessage('Password is required')
      .isString().withMessage('Password must be a string')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  
];
  
