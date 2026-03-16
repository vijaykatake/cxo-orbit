const { v4: uuidv4 } = require('uuid');
const Event = require('../models/Event');
const Registration = require('../models/Registration');

// Slug generator
const toSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// ─── Public: Get All Published Events ────────────────────
const getPublicEvents = async (req, res) => {
  try {
    const { type, city, status = 'published' } = req.query;
    const where = { status, isDeleted: false };
    if (type) where.eventType = type;
    if (city) where.city = city;

    const events = await Event.findAll({
      where,
      order: [['startDate', 'ASC']],
      attributes: { exclude: ['isDeleted', 'createdBy'] },
    });

    res.json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Public: Get Single Event by Slug ────────────────────
const getEventBySlug = async (req, res) => {
  try {
    const event = await Event.findOne({ where: { slug: req.params.slug, status: 'published' } });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Admin: Get All Events ────────────────────────────────
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.unscoped().findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Admin: Create Event ──────────────────────────────────
const createEvent = async (req, res) => {
  try {
    const { title } = req.body;
    let slug = toSlug(title);
    const exists = await Event.unscoped().findOne({ where: { slug } });
    if (exists) slug = `${slug}-${Date.now()}`;

    const event = await Event.create({
      id: uuidv4(),
      ...req.body,
      slug,
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Admin: Update Event ──────────────────────────────────
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    await event.update(req.body);
    res.json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Admin: Delete Event (soft) ───────────────────────────
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    await event.update({ isDeleted: true });
    res.json({ success: true, message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Member: RSVP to Event ────────────────────────────────
const rsvpEvent = async (req, res) => {
  try {
    const { eventId, response } = req.body;
    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    const [reg, created] = await Registration.findOrCreate({
      where: { eventId, userId: req.user.id },
      defaults: { id: uuidv4(), eventId, userId: req.user.id, rsvpResponse: response, status: 'confirmed' },
    });

    if (!created) await reg.update({ rsvpResponse: response });

    res.json({ success: true, message: created ? 'RSVP registered' : 'RSVP updated', data: reg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getPublicEvents, getEventBySlug, getAllEvents, createEvent, updateEvent, deleteEvent, rsvpEvent };
