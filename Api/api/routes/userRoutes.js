// # felhasználókkal kapcsolatos útvonalak

const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// Route-ok

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id/admin", userController.updateUserAdmin);
router.put("/:id", userController.updateUser);
router.post("/", userController.createUser);


// Bejelentkezés
router.post("/login", userController.loginUser);

// Kijelentkezés
router.post("/logout", userController.logoutUser);

// Elfelejtett jelszó
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

// Session ellenőrzés
router.get("/check/session", userController.checkSession);

module.exports = router;