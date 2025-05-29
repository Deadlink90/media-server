const { Product } = require("../models");
const { categoryIdByName } = require("../helpers/searchId");

const getProducts = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  try {
    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .populate("user", "name")
        .populate("category", "name")
        .limit(limit)
        .skip(from),
    ]);

    res.json({
      total,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong ):",
      status: "false",
    });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id)
      .populate("user", "name")
      .populate("category", "name");
    res.json({
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      status: "false",
    });
  }
};

const createProduct = async (req, res) => {
  const { name, price, description, category } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category: await categoryIdByName(category),
      user: req.user._id,
    });

    const productSaved = await newProduct.save();

    res.status(201).json({
      message: "product created successfully!!",
      status: "true",
      productSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      status: "false",
    });
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { state, user, ...args } = req.body;

  try {
    args.user = req.user._id;
    if (args.category) {
      args.category = await categoryIdByName(args.category);
    }

    const editedProduct = await Product.findByIdAndUpdate(id, args, {
      new: true,
    });

    res.json({
      message: "Product updated successfully!!",
      status: "true",
      editedProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
      status: "false",
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    );

    res.json({
      message: "Product deleted successfully!!",
      status: "true",
      deletedProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      status: "false",
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
