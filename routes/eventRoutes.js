import express from 'express';
import { addEvent, getEventAttendees, getOrganiserEvents, registerForEvent } from '../controllers/eventController.js';
import { organiserOnly, userAuthMiddleware } from '../middlewares/userAuthMiddleware.js';
import { markAttendance } from '../controllers/attendanceController.js';


const router = express.Router();
//create an event
router.post("/add-event", userAuthMiddleware, addEvent)


// Register for event (student)
router.post('/:id/registerok', userAuthMiddleware, registerForEvent);

// Get all events
router.get('/my-events', userAuthMiddleware, getOrganiserEvents);

// get attendee of events
router.get('/:id/attendees', userAuthMiddleware, getEventAttendees);

//attendance routes
router.post("/mark-attendance", userAuthMiddleware, organiserOnly, markAttendance);


export default router;
