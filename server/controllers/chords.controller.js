const { fetchChordList, fetchChordByIdOrName } = require('../services/chords.service');

// GET /chords
function getChords(_req, res) {
  try {
    const rows = fetchChordList();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list chords' });
  }
}

// GET /chords/:idOrName
function getChord(req, res) {
  try {
    const { idOrName } = req.params;
    const result = fetchChordByIdOrName(idOrName);
    if (!result) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch chord' });
  }
}

module.exports = {
  getChords,
  getChord,
};


