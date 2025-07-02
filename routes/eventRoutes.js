import express from 'express';
import { addEvent, getEventAttendees, getOrganiserEvents, registerForEvent } from '../controllers/eventController.js';
import { userAuthMiddleware } from '../middlewares/userAuthMiddleware.js';


const router = express.Router();
//create an event
router.post("/add-event", userAuthMiddleware, addEvent)


// Register for event (student)
router.post('/:id/registerok', userAuthMiddleware, registerForEvent);

// Get all events
router.get('/my-events', userAuthMiddleware, getOrganiserEvents);

// get attendee of events
router.get('/:id/attendees', userAuthMiddleware, getEventAttendees);

export default router;
