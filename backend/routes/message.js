const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const messageCtrl = require("../controllers/message");
const multer = require("../middleware/multer-config");
const validate = require("../middleware/valid-data");

// Déclaration des routes messages, avec authentification
router.post("/", auth, validate.message, multer, messageCtrl.createMessage);
router.get("/", auth, messageCtrl.getAllMessages);
router.get("/:id", auth, validate.id, messageCtrl.getMessage);
router.get("/all/:id", auth, validate.id, messageCtrl.getAllMessagesForOne);
router.delete("/:id", auth, validate.id, messageCtrl.deleteMessage);

module.exports = router;
