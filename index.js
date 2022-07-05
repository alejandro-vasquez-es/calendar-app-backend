const express = require("express");


// Create the express server

const app = express();


// Routes
app.get('/', (req, res) => {
	console.log('require slash');
	res.json({
		ok: true
	})
});


// Listen to peticitions

app.listen(4000, () => {
	console.log("server running in port " + 4000)
});