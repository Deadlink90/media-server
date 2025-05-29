const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateJWT } = require("../helpers/JWT");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userFounded = await User.findOne({ email });

    if (!userFounded)
      return res.status(400).json({
        message: "User not founded",
        status: "false",
      });

    if (!userFounded.status)
      return res.status(400).json({
        message: "Not authorized",
        status: "false",
      });

    const validPassword = bcrypt.compareSync(password, userFounded.password);

    if (!validPassword)
      return res.status(400).json({
        message: "Invalid credentials!!",
        status: "false",
      });

    const token = await generateJWT(userFounded._id);

    res.json({
      userFounded,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error!!",
      status: "false",
    });
  }

};

const renewToken = async(req,res) => {
const {user} = req;

const token = await generateJWT(user.id);

res.json({
token,
user  
})

}

module.exports = {
  login,
  renewToken
};
