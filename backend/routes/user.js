const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const validate = require("../middleware/valid-data");

const userCtrl = require("../controllers/user");

// Déclaration des routes user, sans authentification
router.post("/signup", validate.user, userCtrl.signup);
router.post("/login", validate.user, userCtrl.login);
router.get("/:id", auth, userCtrl.getUser);
router.get("/", auth, userCtrl.getAllUsers);

module.exports = router;
