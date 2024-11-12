const express = require("express");
const RecipeController = require("../controllers/RecipeController");
const { body } = require("express-validator");
const router = express.Router();
const handleErrorMessage = require("../middleware/handleErrorMessage");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const upload = require("../helpers/upload");

router.get("", RecipeController.index);
router.post(
  "",
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("ingredients").notEmpty().isArray({ min: 3 }),
  ],
  handleErrorMessage,
  RecipeController.store
);
router.get("/:id", RecipeController.show);
router.post(
  "/:id/upload",
  [
    upload.single("photo"),
    body("photo").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Photo is required");
      }
      if (!req.file.mimetype.startsWith("image")) {
        throw new Error("Photo must be image");
      }
      return true;
    }),
  ],
  handleErrorMessage,
  RecipeController.upload
);
router.delete("/:id", RecipeController.destroy);
router.patch("/:id", RecipeController.update);

module.exports = router;
