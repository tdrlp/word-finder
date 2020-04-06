const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// IMPORT ROUTES
const gridRoute = require('./routes/grid');

// CORS SETUP
// TODO: Remove 'undefined' from list. Only here to allow requests from postman
const whitelist = ['http://localhost:3000', undefined];
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) callback(null, true);
		else callback(new Error('Not allowed by CORS'));
	},
};

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

// ROUTES
app.use('/api/grid', gridRoute);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
