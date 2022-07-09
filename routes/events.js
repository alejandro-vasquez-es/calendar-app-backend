/* 
	User Routes / Events
	host * /api/events
 */

const { Router } = require('express');
const { jwtValidator } = require('../middlewares/jwtValidator')
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { fieldValidators } = require('../middlewares/fieldValidators');
const isDate = require('../helpers/isDate');
const router = Router();

// Everyone has to pass by the jwt validation
router.use(jwtValidator);

// request events
router.get(
	'/',
	[
		fieldValidators
	],
	getEvents,
);

// Create a new event
router.post(
	'/',
	[
		check('title', 'required title').notEmpty(),
		check('start', 'Required a valid start date').custom(isDate),
		check('end', 'Required a valid end date').custom(isDate),
		fieldValidators
	],
	createEvent
);

// Update event
router.put(
	'/:id',
	[
		check('title', 'required title').notEmpty(),
		check('start', 'Required a valid start date').custom(isDate),
		check('end', 'Required a valid end date').custom(isDate),
		fieldValidators
	],
	updateEvent
);

// Delete event
router.delete(
	'/:id',
	[
		fieldValidators
	],
	deleteEvent
);


module.exports = router;