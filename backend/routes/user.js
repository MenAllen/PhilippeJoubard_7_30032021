const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const validate = require("../middleware/valid-data");

const userCtrl = require("../controllers/user");

// Déclaration des routes user, sans authentification
router.post("/signup", userCtrl.signup);
router.post("/login", validate.user, userCtrl.login);

// Déclaration des routes user, avec authentification
router.get("/:id", auth, userCtrl.getUser);
router.get("/", auth, userCtrl.getAllUsers);
router.delete("/", auth, userCtrl.deleteMyAccount);
router.delete("/:id", auth, validate.id, userCtrl.deleteUser);
router.post("/admin/:id", auth, validate.id, userCtrl.adminUser);

module.exports = router;
