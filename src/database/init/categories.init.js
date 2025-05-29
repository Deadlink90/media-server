const { Category } = require("../../models");
const { userIdByEmail } = require("../../helpers/searchId");

const categoryInit = async () => {
  try {
    const count = await Category.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new Category({
        name: "FRUITS",
        user: await userIdByEmail('admin@gmail.com'),
      }).save(),
      new Category({
        name: "VEGETABLES",
        user: await userIdByEmail('admin@gmail.com'),
      }).save(),
      new Category({
        name: "MEAT",
        user: await userIdByEmail('admin@gmail.com'),
      }).save(),
      new Category({
        name: "FROZEN FOODS",
        user: await userIdByEmail('admin@gmail.com'),
      }).save(),
      new Category({
        name: "BREAD AND BAKED GOODS",
        user: await userIdByEmail('admin@gmail.com'),
      }).save(),
    ]);
    console.log('-> values inserted in Category collection');
    console.log(values)
  } catch (err) {
    console.log('-> values dont inserted in Category collection');
    console.log(err)
  }
};

module.exports = categoryInit;
