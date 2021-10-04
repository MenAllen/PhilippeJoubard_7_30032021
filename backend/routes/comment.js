const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");
const validate = require("../middleware/valid-data");

// Déclaration des routes messages, avec authentification
router.post("/", auth, validate.comment, commentCtrl.createComment);
router.get("/", auth, validate.messageId, commentCtrl.getAllComments);
router.delete("/:id", auth, validate.id, commentCtrl.deleteComment);

module.exports = router;
