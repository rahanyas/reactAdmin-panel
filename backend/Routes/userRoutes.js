import express from 'express';
const router = express.Router();

import { login, signUp } from '../controllers/userController.js';


router.post('/signup', signUp);
router.post('/login', login);
export default router