const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {

	const events = await Event.find().populate('user', 'name');

	return res.json({
		ok: true,
		events
	})
}

const createEvent = async (req, res = response) => {

	const event = new Event(req.body);

	try {

		event.user = req.uid;

		const savedEvent = await event.save();

		res.json({
			ok: true,
			msg: 'updating event...',
			event: savedEvent
		})


	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'please talk with the admin'
		});
	}
}
const updateEvent = async (req, res = response) => {

	const eventId = req.params.id;
	const uid = req.uid;

	try {

		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({
				ok: false,
				msg: 'No events found for that id'
			})
		}


		// check if the user who created the event is the one who wants to update it
		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'The user is not allowed to modify this event'
			})
		}

		const newEvent = {
			...req.body,
			user: uid
		}

		/* const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent);
		This return the old event, in case you want to do a comparision */
		const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });
		//if you want to see the new change, then add {new: true} as argument 

		return res.json({
			ok: true,
			event: updatedEvent
		})

	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Try to talk with the admin'
		})
	}
}
const deleteEvent = async (req, res = response) => {

	const eventId = req.params.id;
	const uid = req.uid;

	try {

		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({
				ok: false,
				msg: 'No events found for that id'
			})
		}


		// check if the user who created the event is the one who wants to delete it
		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'The user is not allowed to delete this event'
			})
		}

		await Event.findByIdAndDelete(eventId);

		return res.json({
			ok: true,
			msg: 'the event was deleted succesfully'
		})

	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Try to talk with the admin'
		})
	}
}

module.exports = {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent
}