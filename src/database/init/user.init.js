const { User } = require("../../models");

const userInit = async () => {
  try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;

    values = await Promise.all([
      new User({
        name: "admin",
        email: "admin@gmail.com",
        password: "admintest",
        img: "adminimage.png",
        role: "ADMIN_ROLE",
      }).save(),
    ]);
    console.log("-> values inserted in User collection");
    console.log(values);
  } catch (error) {
    console.log("-> values dont inserted in User collection");
    console.log(error);
  }
};

module.exports = userInit;
