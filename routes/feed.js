const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Feed
 *     description: Feed related routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - image
 *       properties:
 *         title:
 *           type: string
 *           description: 'The title of the post'
 *         image:
 *           type: string
 *           format: binary
 *           description: 'The image file'
 *         content:
 *           type: string
 *           description: 'The content of the post'
 */

/**
 * @swagger
 * /feed/post:
 *   post:
 *     tags: [Feed]
 *     security: [BearerAuth: []]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       '201': { description: 'Created' }
 *       '401': { description: 'Unauthorized' }
 *       '500': { description: 'Internal Server Error' }
 */
router.post("/post", isAuth, feedController.createPost);

/**
 * @swagger
 * /feed/posts:
 *   get:
 *     tags: [Feed]
 *     security: [BearerAuth: []]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get("/posts", isAuth, feedController.getPosts);

/**
 * @swagger
 * /feed/post/{postId}:
 *   get:
 *     tags: [Feed]
 *     security: [BearerAuth: []]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200': { description: 'OK' }
 *       '401': { description: 'Unauthorized' }
 *       '404': { description: 'Not Found' }
 *       '500': { description: 'Internal Server Error' }
 *   put:
 *     tags: [Feed]
 *     security: [BearerAuth: []]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       '200': { description: 'OK' }
 *       '401': { description: 'Unauthorized' }
 *       '500': { description: 'Internal Server Error' }
 *   delete:
 *     tags: [Feed]
 *     security: [BearerAuth: []]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200': { description: 'OK' }
 *       '401': { description: 'Unauthorized' }
 *       '500': { description: 'Internal Server Error' }
 */
router.get("/post/:postId", isAuth, feedController.getPost);
router.put("/post/:postId", isAuth, feedController.updatePost);
router.delete("/post/:postId", isAuth, feedController.deletePost);

module.exports = router;
