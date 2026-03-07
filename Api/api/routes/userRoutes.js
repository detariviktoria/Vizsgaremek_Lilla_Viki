// # felhasználókkal kapcsolatos útvonalak

const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");
const { body } = require('express-validator');

// Route-ok

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Összes felhasználó lekérése (Admin)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Felhasználók listája
 *       403:
 *         description: Nincs jogosultság
 */
router.get("/", authMiddleware, userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Egy felhasználó lekérése ID alapján
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Felhasználó adatai
 */
router.get("/:id", authMiddleware, userController.getUserById);

router.put("/:id/admin", authMiddleware, adminMiddleware, userController.updateUserAdmin);
router.put("/:id", authMiddleware, userController.updateUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Új felhasználó regisztrációja
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Felhasználó létrehozva
 */
router.post("/", [
    body('email').isEmail().withMessage('Érvénytelen email cím!'),
    body('name').isLength({ min: 3 }).withMessage('A névnek legalább 3 karakternek kell lennie!'),
    body('password').isLength({ min: 6 }).withMessage('A jelszónak legalább 6 karakternek kell lennie!')
], userController.createUser);


// Bejelentkezés
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Bejelentkezés
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sikeres bejelentkezés
 *       401:
 *         description: Hibás adatok
 */
router.post("/login", userController.loginUser);

// Kijelentkezés
router.post("/logout", authMiddleware, userController.logoutUser);

// Elfelejtett jelszó
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

// Session ellenőrzés
router.get("/check/session", userController.checkSession);

module.exports = router;