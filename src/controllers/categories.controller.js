const { response } = require("express");
const { Category } = require("../models");

const obtainCategories = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  try {
    const [categories, total] = await Promise.all([
      Category.find(query).skip(from).limit(limit).populate("user","name"),

      Category.countDocuments(query),
    ]);

    res.json({
      categories,
      total,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong ):",
      status: "false",
    });
  }
};

const obtainCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryFounded = await Category.findById(id)
    .populate('user','name');
    res.json({
      categoryFounded,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong ):",
      status: "false",
    });
  }
};

const createCategorie = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryDB = await Category.findOne({ name });

  if (categoryDB)
    return res.status(400).json({
      message: `The category '${name}' already exists`,
      status: "false",
    });

  const data = {
    name,
    user: req.user._id,
  };

  const newCategory = new Category(data);
  const savedCategory = await newCategory.save();

  res.status(201).json({
    message: "Category added successfully",
    status: "true",
    savedCategory,
  });
};

const updateCategorie = async (req, res) => {
  const { id } = req.params;
  const name = req.body.name.toUpperCase();
  
  const data = {
  name,
  user:req.user._id
  }

  try {
  const updatedCategorie = await Category.findByIdAndUpdate(id,data,{
  new:true  
  })
  res.json({
  message:"Categorie updated sucessfully",
  status:"true",
  updatedCategorie  
  })
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong ):",
      status: "false",
    });
  }
};

const deleteCategorie = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    );
    res.json({
      message: "category deleted successfully",
      sttaus: "true",
      deletedCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong ):",
      status: "false",
    });
  }
};

module.exports = {
  obtainCategories,
  obtainCategorie,
  createCategorie,
  updateCategorie,
  deleteCategorie,
};
