const express = require('express');
const _ = require('lodash');
const router = express.Router();

const gridController = require('../controllers/gridController');
const gridValidator = require('../validators/gridValidator');

router.get('/new', gridValidator.newGrid, gridController.newGrid);
router.post('/select', gridValidator.selectWord, gridController.selectWord);

module.exports = router;
