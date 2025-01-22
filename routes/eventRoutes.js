import express from "express";

import {
    createEvent,
    deleteEvent,
    getEvents,
    helloEvent,
    updateEvent
} from "../controllers/eventController.js";

const router = express.Router();

router.post('/create', createEvent);
router.get('/fetch', getEvents);
router.delete("/remove/:eventId", deleteEvent);
router.put("/update/:eventId", updateEvent);

export default router;
