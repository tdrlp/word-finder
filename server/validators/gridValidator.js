const { check, validationResult } = require('express-validator');
const _ = require('lodash');

const validation = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(422).json({ errors: errors.array() });
	next();
};

exports.newGrid = [
	check('width')
		.toInt()
		.isInt({ min: 6, max: 50 })
		.withMessage('Grid minimum width is 6 and maximum width is 50.')
		.bail(),
	validation,
];

exports.selectWord = [
	check('words', 'List of words must be an array.').isArray().not().isEmpty(),
	check('grid', 'The grid must be passed in.').not().isEmpty(),
	check('selection', 'The selection must have a fromCell and toCell.').custom(
		(selection) => {
			if (
				!_.get(selection, 'fromCell') ||
				!_.get(selection, 'fromCell') ||
				!_.get(selection, 'toCell') ||
				!_.get(selection, 'toCell')
			) {
				return false;
			}

			return true;
		}
	),
	validation,
];
