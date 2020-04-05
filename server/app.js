const express = require('express');

const app = express();
const PORT = 3000;

// IMPORT ROUTES
const gridRoute = require('./routes/grid');

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use('/grid', gridRoute);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
