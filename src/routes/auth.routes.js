const { Router } = require("express");
const { check } = require("express-validator");
const {validateJwtMiddleware} = require('../middlewares')
const { login,renewToken } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validateFields.middleware");
const router = Router();

router.post(
  "/login",
  [
    check("email", "invalid field (email)").isEmail(),
    check("password", "invalidF field (password)").not().isEmpty(),
    validateFields,
  ],
  login
);

router.get('/',validateJwtMiddleware,renewToken)

module.exports = router;
