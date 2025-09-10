const { listChords, getChordById, getChordByName } = require('../database/db');

// Return list of chords with minimal fields for listing
function fetchChordList() {
  return listChords();
}

// Return a normalized chord by id or name, or null if not found
function fetchChordByIdOrName(idOrName) {
  const numericId = Number(idOrName);
  const row = Number.isFinite(numericId) ? getChordById(numericId) : getChordByName(idOrName);
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    tuning: row.tuning,
    frets: JSON.parse(row.frets),
    fingers: JSON.parse(row.fingers),
    baseFret: row.baseFret,
  };
}

module.exports = {
  fetchChordList,
  fetchChordByIdOrName,
};


