const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

router.post(
    '/register',
    [
      check('username').notEmpty().withMessage('Username is required'),
      check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    ],
    authController.register
  );
  

router.post(
    '/login',
    [
      check('username').notEmpty().withMessage('Username is required'),
      check('password').notEmpty().withMessage('Password is required'),
    ],
    authController.login
  );

router.post(
    '/delete',
    [
      check('username').notEmpty().withMessage('Username is required'),
    ],
    authController.delete
  );
  
module.exports = router;

  
  
  
  
  