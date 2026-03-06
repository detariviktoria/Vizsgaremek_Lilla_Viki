// # felhasználókkal kapcsolatos útvonalak

const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');

const userController = require("../controllers/userController");
const { authMiddleware, adminMiddleware } = require("../middlewares/auth");

const validateUser = [
  body('email').isEmail().withMessage('Érvénytelen email cím'),
  body('password').isLength({ min: 6 }).withMessage('A jelszónak legalább 6 karakternek kell lennie'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - jelszo
 *       properties:
 *         id:
 *           type: integer
 *           description: Automatikusan generált azonosító
 *         email:
 *           type: string
 *           description: Felhasználó email címe
 *         felhasznalonev:
 *           type: string
 *           description: Felhasználónév
 *         admin:
 *           type: boolean
 *           description: Adminisztrátor-e a felhasználó
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Összes felhasználó lekérése
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Felhasználók listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);

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
 *               email:
 *                 type: string
 *               jelszo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sikeres bejelentkezés
 *       401:
 *         description: Hibás adatok
 */
router.post("/login", userController.loginUser);

// Route-ok

router.get("/:id", authMiddleware, userController.getUserById);
router.put("/:id/admin", authMiddleware, adminMiddleware, userController.updateUserAdmin);
router.put("/:id", authMiddleware, userController.updateUser);
router.post("/", validateUser, userController.createUser);


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