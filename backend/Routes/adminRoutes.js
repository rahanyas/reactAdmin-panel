import express from 'express';
const router = express.Router();
import {adminAuth} from '../middleware/authMiddleware.js'
import { adminLogin, blockUser, getUsers, unBlockUser } from "../controllers/adminController.js";

router.post('/adminLogin', adminLogin);
router.get('/getUsers', adminAuth, getUsers);
router.post('/blockUser', adminAuth, blockUser);
router.post('/unBlockUser', adminAuth, unBlockUser)

export default router