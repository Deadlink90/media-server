const jwt = require("jsonwebtoken");
const { User } = require("../models");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.PRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Token not generated!!");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const checkToken = async (token = "") => {
  try {
    if (!token) return null;

    const { uid } = jwt.verify(token, process.env.PRIVATEKEY);

    const user = await User.findById(uid);

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(err);
    return null;
  }
};

module.exports = {
  generateJWT,
  checkToken
};
