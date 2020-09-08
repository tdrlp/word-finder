const express = require('express');
const compression = require('compression');
const cors = require('cors');

const PORT = process.env.PORT || 5050;
const app = express();

// IMPORT ROUTES
const gridRoute = require('./routes/grid');

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(compression());

// ROUTES
app.use('/api/grid', gridRoute);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
