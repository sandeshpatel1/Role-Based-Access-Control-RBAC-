const jwt = require('jsonwebtoken');

// This middleware will check if the user has the correct role
const authMiddleware = (roles) => (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Token is required' });
    }

    // Extract token from Authorization header
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Token is required' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // If specific roles are required, check if the user's role matches
    if (roles && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    // Proceed to the next middleware or route handler
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
