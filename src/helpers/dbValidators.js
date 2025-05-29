const {User,Role,Category,Product} = require("../models");

const isRoleValid = async (role = "") => {
  const roleExist = await Role.findOne({ name: role });
  if (!roleExist) {
    throw new Error("Role not valid");
  }
};

const existsEmail = async (email) => {
  const emailExists = await User.findOne({ email });
  if (emailExists) throw new Error(`The email ${email} already exists!!`);
};

const existsUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error(`User not founded`);
};

const existsCategory = async(categoryName) => {
const name = categoryName.toUpperCase();
const categoryExists = await Category.findOne({name});
if(categoryExists) throw new Error( `The category '${name}' already exists`)
}

const existsProduct = async(name)=> {
const product = await Product.findOne({name});
if(product) throw new Error(`The product '${name}' already exists`)
}

const allowedCollections = (collection='',collections=[]) =>{
 const isAllowed = collections.includes(collection)
 if(!isAllowed) throw new Error(`Not allowed collection (${collection})`);
 return true;
}

module.exports = {
  isRoleValid,
  existsEmail,
  existsUser,
  existsCategory,
  existsProduct,
  allowedCollections
};
