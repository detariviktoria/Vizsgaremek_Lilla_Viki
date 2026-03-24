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
 * /users:
 *   get:
 *     summary: Összes felhasználó lekérése
 *     tags: [Felhasználók]
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
 *     tags: [Felhasználók]
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
 */
router.post("/login", userController.loginUser);

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

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Felhasználó saját adatainak frissítése
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sikeres frissítés
 */
router.put("/:id", authMiddleware, userController.updateUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Új felhasználó regisztrációja
 *     tags: [Felhasználók]
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
 *               ajanlo_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Felhasználó létrehozva
 */
router.post("/", validateUser, userController.createUser);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Kijelentkezés
 *     tags: [Felhasználók]
 *     responses:
 *       200:
 *         description: Sikeres kijelentkezés
 */
router.post("/logout", userController.logoutUser);

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
router.post("/forgot-password", userController.forgotPassword);

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
router.post("/reset-password", userController.resetPassword);

/**
 * @swagger
 * /users/check/session:
 *   get:
 *     summary: Bejelentkezési állapot ellenőrzése
 *     tags: [Felhasználók]
 *     responses:
 *       200:
 *         description: Felhasználó adatai
 *       401:
 *         description: Nincs aktív session
 */
router.get("/check/session", userController.checkSession);

/**
 * @swagger
 * /users/check-availability:
 *   get:
 *     summary: Felhasználónév vagy email elérhetőségének ellenőrzése
 *     tags: [Felhasználók]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Elérhetőség állapota
 */
router.get("/check-availability", userController.checkAvailability);

module.exports = router;