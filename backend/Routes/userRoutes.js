import express from 'express';
const router = express.Router();

import { login, signUp ,addToCart, cartpage, removeCartItem} from '../controllers/userController.js';

import requireAuth from "../middleware/authMiddleware.js";

router.post('/signup', signUp);
router.post('/login', login);

router.get('/showCart', requireAuth, cartpage)
router.post('/cart', requireAuth, addToCart);
router.delete('/removeCartItem', requireAuth, removeCartItem)

export default router