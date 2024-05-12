const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication related routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required: ['email', 'password', 'name']
 *       properties:
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *         name:
 *           type: string
 *           description: User's name
 */

/**
 * @swagger
 * /auth/signup:
 *   put:
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: OK
 */
router.put(
    "/signup",
    [
        body("email")
            .isEmail()
            .withMessage("Please enter a valid email.")
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then((userDoc) => {
                    if (userDoc) {
                        return Promise.reject("E-Mail address already exists!");
                    }
                });
            })
            .normalizeEmail(),
        body("password").trim().isLength({ min: 5 }),
        body("name").trim().not().isEmpty(),
    ],
    authController.signup
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ['email', 'password']
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token: { type: string, description: 'The JWT for authenticating subsequent requests.' }
 *                 userId: { type: string, description: 'The ID of the logged in user.' }
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/status:
 *   get:
 *     tags: [Auth]
 *     security: [BearerAuth: []]
 *     responses: { '200': { description: 'OK' } }
 *   patch:
 *     tags: [Auth]
 *     security: [BearerAuth: []]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ['status']
 *             properties:
 *               status: { type: string }
 *     responses: { '200': { description: 'OK' } }
 */
router.get("/status", isAuth, authController.getStatus);
router.patch(
    "/status",
    isAuth,
    [body("status").trim().not().isEmpty()],
    authController.updateStatus
);

module.exports = router;
