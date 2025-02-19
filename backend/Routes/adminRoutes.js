import express from 'express';
const router = express.Router();
import requireAuth from '../middleware/authMiddleware.js'
import { adminLogin } from "../controllers/adminController.js";

router.post('/adminLogin', adminLogin);

export default router