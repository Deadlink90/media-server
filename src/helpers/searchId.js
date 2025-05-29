const { User,Category } = require("../models");

const userIdByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not founded!!");
    return user._id;
};

const categoryIdByName = async(name) =>{
const category = await Category.findOne({name});
if(!category) throw new Error("Category not founded!!");
return category._id;
}

module.exports = {
  userIdByEmail,
  categoryIdByName 
};
