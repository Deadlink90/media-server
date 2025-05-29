const { request } = require("express");

const isAdmin = (req = request, res, next) => {
  if (!req.user)
    return res.status(500).json({
      message: "Something bad happened ):",
      status: "false",
    });

  const { role } = req.user;

  if (role !== "ADMIN_ROLE")
    return res.status(401).json({
      message: "No authorized, only Admins",
      status: "false",
    });

  next();
};

const hasRole = (...roles) => {
  
  return (req, res, next) => {
    if (!req.user)
      return res.status(500).json({
        message: "Something bad happened ):",
        status: "false",
      });

    const { role } = req.user;

    if (!roles.includes(role))
      return res.status(401).json({
        message: "You're not allowed to do this!!",
        status: "false",
      });

    next();
  };
};

module.exports = {
  isAdmin,
  hasRole,
};
