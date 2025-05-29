const { response, request } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category,Product } = require("../models");

const allowCollections = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", req = request, res = response) => {
  const { limit=5, from=0 } = req.query;
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  })
    .limit(limit)
    .skip(from);

  res.json({
    results: users,
  });
};

const searchCategories = async (term = "", req = request, res = response) => {
  const { limit=5, from=0 } = req.query;

  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const category = await Category.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, "i");

  const categories =await  Category.find({
    $and: [{ name: regex }, { state: true }],
  })
  .limit(limit)
  .skip(from)

  res.json({
    results: categories,
  });
};

const searchProducts = async(term = "", req = request, res = response) => {
 const {limit=5,from=0} = req.query;

 const isMongoId = ObjectId.isValid(term);

 if(isMongoId){
 const product = await Product.findById(term)
 .populate('user','name')
 .populate('category','name')
 return res.json({
 results: (product) ? [product] : []
 })
 }

 const regex = new RegExp(term,'i');

 const products = await Product.find({
 $or:[{name:regex},{description:regex}],
 $and:[{state:true}] 
 })
 .populate('user','name')
 .populate('category','name')
 .limit(limit)
 .skip(from)

 res.json({
 results:products 
 })

}

const search = async (req, res = response) => {
  const { colection, term } = req.params;

  if (!allowCollections.includes(colection))
    return res.status(400).json({
      message: `Not allow collection. allow collections are: ${allowCollections}`,
      status: "false",
    });

  switch (colection) {
    case "users":
      searchUsers(term, req, res);
      break;

    case "categories":
      searchCategories(term,req,res);
      break;

    case "products":
      searchProducts(term,req,res)
    break;

    default:
      res.status(500).json({
        message: "search no implemented yet",
        requestedCollection: colection,
        status: "false",
      });
      break;
  }
};

module.exports = {
  search,
};
