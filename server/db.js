const Database = require('better-sqlite3');
const path = require('path');

// Return a singleton DB connection to sqlite file
let dbInstance;
function getDb() {
  if (!dbInstance) {
    const dbPath = path.join(__dirname, 'data.sqlite');
    dbInstance = new Database(dbPath);
    dbInstance.pragma('journal_mode = WAL');
  }
  return dbInstance;
}

// Create schema if not exists
function initSchema() {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS chords (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      tuning TEXT NOT NULL DEFAULT 'EADGBE',
      frets TEXT NOT NULL,
      fingers TEXT NOT NULL,
      baseFret INTEGER NOT NULL DEFAULT 1
    );
  `);
}

// Helpers
function listChords() {
  const db = getDb();
  const stmt = db.prepare('SELECT id, name FROM chords ORDER BY name ASC');
  return stmt.all();
}

function getChordById(id) {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM chords WHERE id = ?');
  return stmt.get(id);
}

function getChordByName(name) {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM chords WHERE name = ?');
  return stmt.get(name);
}

function upsertChord(chord) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO chords (name, tuning, frets, fingers, baseFret)
    VALUES (@name, @tuning, @frets, @fingers, @baseFret)
    ON CONFLICT(name) DO UPDATE SET
      tuning = excluded.tuning,
      frets = excluded.frets,
      fingers = excluded.fingers,
      baseFret = excluded.baseFret
    RETURNING *;
  `);
  return stmt.get({
    name: chord.name,
    tuning: chord.tuning || 'EADGBE',
    frets: JSON.stringify(chord.frets),
    fingers: JSON.stringify(chord.fingers),
    baseFret: chord.baseFret || 1,
  });
}

module.exports = {
  getDb,
  initSchema,
  listChords,
  getChordById,
  getChordByName,
  upsertChord,
};
