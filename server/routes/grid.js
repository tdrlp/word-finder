const express = require('express');
const Grid = require('../models/Grid');

const router = express.Router();

router.get('/new', (req, res) => {
	try {
		const width = parseInt(req.query.width, 10);
		const heigth = parseInt(req.query.height, 10);

		const grid = new Grid(width, heigth);
		res.send({
			words: grid.words,
			grid: {
				height: grid.height,
				width: grid.width,
				values: grid.getGridIn2D(),
			},
		});
	} catch (err) {
		res.send({ error: err.message });
	}
});

module.exports = router;
