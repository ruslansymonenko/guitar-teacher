const { initSchema, upsertChord } = require('../database/db');
const { chords } = require('./chords');

// Seed minimal set of chords
function run() {
  initSchema();

  for (const chord of chords) upsertChord(chord);

  console.log('Seeded chords:', chords.map(c => c.name).join(', '));
}

if (require.main === module) {
  run();
}

module.exports = { run };
