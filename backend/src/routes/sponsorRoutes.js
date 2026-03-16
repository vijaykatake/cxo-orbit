// sponsorRoutes.js
const router = require('express').Router();
const { submitInquiry, getAllSponsors, updateSponsor } = require('../controllers/sponsorController');
const { authenticate, adminOnly } = require('../middleware/authMiddleware');

router.post('/inquiry',   submitInquiry);
router.get('/',           authenticate, adminOnly, getAllSponsors);
router.put('/:id',        authenticate, adminOnly, updateSponsor);

module.exports = router;
