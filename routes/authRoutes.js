import express from 'express';
import { registerUser, loginUser, logoutUser, checkUserAuth } from '../controllers/authController.js';
import { userAuthMiddleware } from '../middlewares/userAuthMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/logout", logoutUser);
router.get('/check' , userAuthMiddleware , checkUserAuth);
export default router;
