import express from 'express';
import { addEvent, getEventAttendees, getOrganiserEvents, registerForEvent, searchAndFilterEvents , getEventBySlug , organiserDashboard } from '../controllers/eventController.js';
import { organiserOnly, userAuthMiddleware } from '../middlewares/userAuthMiddleware.js';
import { markAttendance } from '../controllers/attendanceController.js';


const router = express.Router();

//to check if the user is an organiser
router.get("/dashboard",userAuthMiddleware, organiserOnly, organiserDashboard);

//create an event
router.post("/add-event", userAuthMiddleware, addEvent)


// Register for event (student)
router.post('/:id/registerok', userAuthMiddleware, registerForEvent);

// Get all events
router.get('/my-events', userAuthMiddleware, organiserOnly, getOrganiserEvents);

// get attendee of events
router.get('/:id/attendees', userAuthMiddleware, organiserOnly , getEventAttendees);

//attendance routes
router.post("/mark-attendance", userAuthMiddleware, organiserOnly, markAttendance);


// Search and filter events
router.get("/search", searchAndFilterEvents);


router.get("/slug/:slug", getEventBySlug);


export default router;
