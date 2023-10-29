import { Router } from "express";
import { login } from "../controllers/authController.js";

const auth: Router = Router();
/**
 * @swagger
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - BearerAuth: []
 *
 * /auth:
 *   post:
 *     summary: Login.
 *     description: Authentication with local password.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Return jwt token used in Authorization http header type bearer.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: dskjahkjdfkjshdjkh$jklajsdkf
 *       401:
 *         description: Failed to authentication, maybe wrong password?
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Failed to authentication
 *     requestBody:
 *       description: Required parameters to send.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: Local Password from credential.json
 *                 example: 123abcdef
 *
 */
auth.route("/auth").post(login);

export default auth;
