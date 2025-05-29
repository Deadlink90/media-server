const { Router } = require("express");
const { check } = require("express-validator");
const { existsProduct } = require("../helpers/dbValidators");
const {
  getProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const {
  validateJwtMiddleware,
  validateFields,
  hasRole,
} = require("../middlewares");

const router = Router();
router.get("/", getProducts);

router.get(
  "/:id",
  [check("id", "no valid id").isMongoId(), validateFields],
  getProduct
);

router.post(
  "/",
  [
    validateJwtMiddleware,
    check("name", "invalid field (product.name)")
      .not()
      .isEmpty()
      .custom(existsProduct),
    check("price", "invalid field (product.price)").not().isEmpty().isNumeric(),
    check("description", "invalid field (product.description)").not().isEmpty(),
    check("category", "invalid field (product.category)"),
    validateFields,
  ],
  createProduct
);

router.put(
  "/:id",
  [
    validateJwtMiddleware,
    hasRole("ADMIN_ROLE"),
    check("id", "not valid id").isMongoId(),
    validateFields,
  ],
  editProduct
);
router.delete(
  "/:id",
  [
    validateJwtMiddleware,
    hasRole("ADMIN_ROLE"),
    check("id", "not valid id").isMongoId(),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
