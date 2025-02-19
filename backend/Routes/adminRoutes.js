import express from 'express';
const router = express.Router();
import requireAuth from '../middleware/authMiddleware.js'
import { adminLogin, getUsers } from "../controllers/adminController.js";

router.post('/adminLogin', adminLogin);
router.get('/getUsers', requireAuth, getUsers);

export default router