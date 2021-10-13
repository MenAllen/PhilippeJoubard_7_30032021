const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");
const validate = require("../middleware/valid-data");

// Déclaration des routes comments, avec authentification
router.post("/:id", auth, validate.id, commentCtrl.createComment);
router.get("/:id", auth, validate.id, commentCtrl.getAllComments);
router.delete("/:id", auth, validate.id, commentCtrl.deleteComment);

module.exports = router;
