const { Product } = require("../../models");
const { userIdByEmail, categoryIdByName } = require("../../helpers/searchId");

const productInit = async () => {
  try {
    const count = await Product.estimatedDocumentCount();
    if (count > 0) return;

    const values = await Promise.all([
      new Product({
        name: "Apple",
        description: "Just an apple xd",
        price: 15.0,
        user: await userIdByEmail("admin@gmail.com"),
        category: await categoryIdByName("FRUITS"),
      }).save(),
      new Product({
        name: "Avocado",
        description: "Just an avocado xd",
        price: 30.0,
        user: await userIdByEmail("admin@gmail.com"),
        category: await categoryIdByName("FRUITS"),
      }).save(),
      new Product({
        name: "Broccoli",
        description: "Just broccoli xd",
        price: 20.0,
        user: await userIdByEmail("admin@gmail.com"),
        category: await categoryIdByName("VEGETABLES"),
      }).save(),
      new Product({
        name: "Corn",
        description: "Just Corn xd",
        price: 5.0,
        user: await userIdByEmail("admin@gmail.com"),
        category: await categoryIdByName("VEGETABLES"),
      }).save(),
      new Product({
        name: "Bacon",
        description: "Just bacon xd",
        price: 3.0,
        user: await userIdByEmail("admin@gmail.com"),
        category: await categoryIdByName("MEAT"),
      }).save(),
    ]);
    console.log("-> values inserted in product collection");
    console.log(values);
  } catch (err) {
    console.log("-> values don inserted (product)");
    console.log(err);
  }
};

module.exports = productInit;
