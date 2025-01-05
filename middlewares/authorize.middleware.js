
const { User, Role } = require('../model/index.model');

const authorize = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: {
          model: Role,
          attributes: ['name'] 
        }
      });

      if (user.Role && !requiredRole.includes(user.Role.name)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: "Error checking user role", error: error.message });
    }
  };
};

module.exports = authorize;
