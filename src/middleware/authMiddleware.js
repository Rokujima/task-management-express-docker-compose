const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token.split(' ').pop(), process.env.JWT_SECRET);

    req.user = decoded.user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};