/* 
	User Routes / Auth
	host * /api/auth
 */


const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidators } = require('../middlewares/fieldValidators')
const router = Router();

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');

router.post(
	'/register',
	[ // middlewares
		check('name', 'Require name').notEmpty(),
		check('email', 'Require a valid email').isEmail(),
		check('password', 'Require password').notEmpty(),
		check('password', 'At least 6 characters in password').isLength({ min: 6 }),
		fieldValidators
	],
	createUser
);

router.post(
	'/',
	[ // middlewares
		check('email', 'Require a valid email').isEmail(),
		check('password', 'Require password').notEmpty(),
		fieldValidators
	],
	loginUser
);


router.get('/renew', revalidateToken);

module.exports = router;