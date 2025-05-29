const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(from).limit(limit),
  ]);

  res.json({
    total,
    users,
  });
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = new User({
    name,
    email,
    role,
  });

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  try {
    const savedUser = await user.save();
    res.json({
      message: "User created Sucessfully!!",
      status: true,
      user: {
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "User not created",
      status: false,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, email, ...userData } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    userData.password = bcrypt.hashSync(password, salt);
  }

  const savedUser = await User.findByIdAndUpdate(id, userData, {
    new: true,
  });

  res.json({
    message: "Put",
    status: "true",
    user: {
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
    },
  });
};

const deleteUser = async(req, res) => {
  const {id} = req.params;

  const deletedUser = await User.findByIdAndUpdate(id,{status:false},{new:true});

  res.json({
    message: "Delete",
    status: "true",
    deletedUser
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
