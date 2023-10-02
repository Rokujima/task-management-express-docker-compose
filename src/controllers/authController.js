const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const  Account = require('../models/Account');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    const existingUser = await Account.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await Account.create({
      username,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, user: { id: newUser.id, username: newUser.username } });
  } catch (error) {
    
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { username, password } = req.body;

      const user = await Account.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
      
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.delete = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { username } = req.body;

      const user = await Account.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      await Account.destroy({ where: { username } })
  
      res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
      
      res.status(500).json({ message: 'Server error' });
    }
  };
  
