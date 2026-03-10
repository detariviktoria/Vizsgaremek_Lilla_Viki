// # felhasználókkal kapcsolatos útvonalak

const express = require("express");
const router = express.Router();
const { body, param } = require('express-validator');

const userController = require("../controllers/userController");
const { authMiddleware, adminMiddleware } = require("../middlewares/auth");
const validate = require("../middlewares/validate");

const validateRegister = [
  body('name').isString().trim().notEmpty().withMessage('A felhasználónév megadása kötelező'),
  body('email').isEmail().withMessage('Érvénytelen email cím'),
  body('password').isLength({ min: 6 }).withMessage('A jelszónak legalább 6 karakternek kell lennie'),
<<<<<<< Updated upstream
  body('ajanlo_id').optional({ nullable: true }).isString(),
  validate,
=======
  validate
];

const validateLogin = [
  body('username').notEmpty().withMessage('Felhasználónév megadása kötelező'),
  body('password').notEmpty().withMessage('Jelszó megadása kötelező'),
  validate
];

const validateForgotPassword = [
  body('email').isEmail().withMessage('Érvénytelen email cím'),
  validate
];

const validateResetPassword = [
  body('token').notEmpty().withMessage('Token megadása kötelező'),
  body('password').isLength({ min: 6 }).withMessage('Az új jelszónak legalább 6 karakternek kell lennie'),
  validate
>>>>>>> Stashed changes
];

const validateLogin = [
  body('username').isString().trim().notEmpty().withMessage('A felhasználónév megadása kötelező'),
  body('password').isString().notEmpty().withMessage('A jelszó megadása kötelező'),
  validate,
];

const validateIdParam = [
  param('id').isInt({ min: 1 }).withMessage('Érvénytelen ID'),
  validate,
];

const validateForgotPassword = [
  body('email').isEmail().withMessage('Érvénytelen email cím'),
  validate,
];

const validateResetPassword = [
  body('token').isString().trim().notEmpty().withMessage('Hiányzó token'),
  body('password').isLength({ min: 6 }).withMessage('A jelszónak legalább 6 karakternek kell lennie'),
  validate,
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
router.get("/", userController.getAllUsers);

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
router.post("/login", validateLogin, userController.loginUser);
<<<<<<< Updated upstream
=======

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Felhasználó lekérése ID alapján
 *     tags: [Felhasználók]
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

/**
 * @swagger
 * /users/{id}/admin:
 *   put:
 *     summary: Felhasználó admin státuszának módosítása
 *     tags: [Felhasználók]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_admin:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Sikeres frissítés
 */
router.put("/:id/admin", authMiddleware, adminMiddleware, userController.updateUserAdmin);
>>>>>>> Stashed changes

// Route-ok

router.get("/:id", authMiddleware, validateIdParam, userController.getUserById);
router.put("/:id/admin", authMiddleware, adminMiddleware, validateIdParam, userController.updateUserAdmin);
router.put("/:id", authMiddleware, validateIdParam, userController.updateUser);
router.post("/", validateRegister, userController.createUser);

// Kijelentkezés
router.post("/logout", userController.logoutUser);

<<<<<<< Updated upstream
// Elfelejtett jelszó
router.post("/forgot-password", validateForgotPassword, userController.forgotPassword);
=======
/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Jelszó-visszaállítási link kérése
 *     tags: [Felhasználók]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email elküldve
 */
router.post("/forgot-password", validateForgotPassword, userController.forgotPassword);

/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     summary: Új jelszó beállítása token alapján
 *     tags: [Felhasználók]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Jelszó sikeresen megváltoztatva
 */
>>>>>>> Stashed changes
router.post("/reset-password", validateResetPassword, userController.resetPassword);

// Session ellenőrzés
router.get("/check/session", userController.checkSession);

module.exports = router;