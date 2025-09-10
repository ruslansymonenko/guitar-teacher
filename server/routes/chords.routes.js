const express = require('express');
const { getChords, getChord } = require('../controllers/chords.controller');

const router = express.Router();

router.get('/', getChords);
router.get('/:idOrName', getChord);

module.exports = router;


