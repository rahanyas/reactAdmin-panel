import express from 'express';
const router = express.Router();

import { login, signUp ,addtoCart} from '../controllers/userController.js';

import requireAuth from "../middleware/authMiddleware.js";

router.post('/signup', signUp);
router.post('/login', login);
router.post('/cart', requireAuth, addtoCart)
export default router