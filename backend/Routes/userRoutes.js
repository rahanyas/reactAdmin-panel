import express from 'express';
const router = express.Router();

import { login, signUp ,addToCart, cartpage} from '../controllers/userController.js';

import requireAuth from "../middleware/authMiddleware.js";

router.post('/signup', signUp);
router.post('/login', login);

router.get('/showCart', requireAuth, cartpage)
router.post('/cart', requireAuth, addToCart);


export default router