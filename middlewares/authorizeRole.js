// middleware/authorizeRole.js

const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
      console.log('Authorize role middleware triggered');
      console.log('Allowed roles:', allowedRoles);
      console.log('User role:', req.user.role);
  
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      console.log('Access granted');
      next();
    };
  };
  
   
  module.exports = authorizeRole;
  