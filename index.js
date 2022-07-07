const express = require("express");
require("dotenv").config();
const { dbConnection } = require('./database/config');

// Create the express server
const app = express();

// Data base
dbConnection();

// Public directory
app.use(express.static('public'));

// Read and parse the body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
// Events: CRUD: Events


// Listen to peticitions
app.listen(process.env.PORT, () => {
	console.log(`Server running in port ${process.env.PORT}`)
})