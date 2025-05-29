const Role = require("../../models/role.model");

const insertIntoRole = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    const values = await Promise.all([
      new Role({
        name: "ADMIN_ROLE",
      }).save(),
      new Role({
        name: "USER_ROLE",
      }).save(),
    ]);
    console.log("-> values inserted in Role collection");
    console.log(values)
  } catch (error) {
    console.log("-> values don't inserted in Role collection");
  }
};

module.exports = insertIntoRole;
