const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, thereIsFiles } = require("../middlewares");
const { allowedCollections } = require("../helpers");
const {
  uploadFile,
  updateImage,
  showImage,
  uploadVideo,
  updateImageCloudinary,
} = require("../controllers/upload.controller");
const router = Router();

router.post("/", thereIsFiles, uploadFile);
router.post("/upload-video", thereIsFiles, uploadVideo);

router.put(
  "/:collection/:id",
  [
    thereIsFiles,
    check("id", "Not valid id").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  updateImage
);

// router.put(
//   "/:collection/:id",
//   [
//     thereIsFiles,
//     check("id", "Not valid id").isMongoId(),
//     check("collection").custom((c) =>
//       allowedCollections(c, ["users", "products"])
//     ),
//     validateFields,
//   ],
//   updateImageCloudinary
// );

router.get(
  "/:collection/:id",
  [
    check("id", "Not valid id").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  showImage
);

module.exports = router;
