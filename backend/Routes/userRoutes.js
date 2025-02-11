import express from 'express';
const router = express.Router();

import { login, signUp, homePage } from '../controllers/userController.js';

import requireAuth from "../middleware/authMiddleware.js";

router.post('/signup', signUp);
router.post('/login', login);
router.get('/home', requireAuth, homePage);
export default router