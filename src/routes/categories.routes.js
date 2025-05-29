const { Router } = require("express");
const { check } = require("express-validator");
const { validateJwtMiddleware, validateFields,isAdmin } = require("../middlewares");
const { existsCategory } = require("../helpers/dbValidators");
const {
  obtainCategories,
  obtainCategorie,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} = require("../controllers/categories.controller");

const router = Router();

router.get("/", obtainCategories);
router.get(
  "/:id",
  [check("id", "no valid id").isMongoId(), validateFields],
  obtainCategorie
);
router.post(
  "/",
  [
    validateJwtMiddleware,
    check("name", "invalid field (name)")
      .not()
      .isEmpty()
      .custom(existsCategory),
    validateFields,
  ],
  createCategorie
);
router.put(
  "/:id",
  [
    validateJwtMiddleware,
    check("id", "no valid id").isMongoId(),
    check("name", "invalid field (name)")
      .not()
      .isEmpty()
      .custom(existsCategory),
    validateFields,
  ],
  updateCategorie
);
router.delete(
  "/:id",
  [
    validateJwtMiddleware,
    isAdmin,
    check("id", "no valid id").isMongoId(),
    validateFields,
  ],
  deleteCategorie
);

module.exports = router;
