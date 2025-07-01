import express from 'express';
import { registerForEvent } from '../controllers/eventController.js';
import { userAuthMiddleware } from '../middlewares/userAuthMiddleware.js';


const router = express.Router();

// Register for event (student)
router.post('/:id/register', userAuthMiddleware, registerForEvent);

export default router;
