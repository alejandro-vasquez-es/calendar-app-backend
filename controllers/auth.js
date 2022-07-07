const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { exists } = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email: email });

		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'The email is already in use'
			})
		}

		user = new User(req.body);

		// encrypt password
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		//generating JWT
		const token = await generateJWT(user.id, user.name);

		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token
		})

	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'please talk with the admin'
		})
	}
}

const loginUser = async (req, res = response) => {

	const { email, password } = req.body;

	try {

		let user = await User.findOne({ email: email });

		if (!user) {
			return res.status(400).json({
				ok: false,
				msg: 'The user with this email doesn\'t exists'
			})
		}

		// Confirm password
		const validPassword = bcrypt.compareSync(password, user.password)

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Wrong password'
			})
		}

		// Generate JWT Json web token
		const token = await generateJWT(user.id, user.name)

		res.json({
			ok: true,
			uid: user.id,
			name: user.name,
			token
		})

	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'please talk with the admin'
		})
	}
}

const revalidateToken = (req, res = response) => {

	const { email, password } = req.body;

	res.json({
		ok: true,
		msg: 'renew'
	})
}





module.exports = {
	createUser,
	loginUser,
	revalidateToken
};