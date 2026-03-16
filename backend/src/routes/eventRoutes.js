const router = require('express').Router();
const { getPublicEvents, getEventBySlug, getAllEvents, createEvent, updateEvent, deleteEvent, rsvpEvent } = require('../controllers/eventController');
const { authenticate, adminOnly } = require('../middleware/authMiddleware');

// Public
router.get('/',           getPublicEvents);
router.get('/:slug',      getEventBySlug);

// Member
router.post('/rsvp',      authenticate, rsvpEvent);

// Admin
router.get('/admin/all',  authenticate, adminOnly, getAllEvents);
router.post('/',          authenticate, adminOnly, createEvent);
router.put('/:id',        authenticate, adminOnly, updateEvent);
router.delete('/:id',     authenticate, adminOnly, deleteEvent);

module.exports = router;
