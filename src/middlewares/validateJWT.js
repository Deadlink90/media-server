const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validateJwtMiddleware = async (req = request, res = response, next) => {
  const token = req.headers["x-access-token"];

  if (!token)
    return res.status(401).json({
      message: "No token provided!!",
      status: "false",
    });

  try {
    const { uid } = jwt.verify(token, process.env.PRIVATEKEY);

    const tryToFind = await User.findById(uid);

    if (!tryToFind)
      return res.status(404).json({
        message: "Not valid User",
        status: "false",
      });

    if (!tryToFind.status)
      return res.status(404).json({
        message: "Not valid User",
        status: "false",
      });

    req.user = tryToFind;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Not valid token",
      status: "false",
    });
  }
};

module.exports = {
  validateJwtMiddleware,
};
