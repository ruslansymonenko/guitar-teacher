const { initSchema, upsertChord } = require('../database/db');

// Seed minimal set of chords
function run() {
  initSchema();

  const sampleChords = [
    {
      name: 'C',
      frets: [0, 3, 2, 0, 1, 0],
      fingers: [0, 3, 2, 0, 1, 0],
      baseFret: 1,
    },
    {
      name: 'G',
      frets: [3, 2, 0, 0, 0, 3],
      fingers: [3, 2, 0, 0, 0, 4],
      baseFret: 1,
    },
    {
      name: 'D',
      frets: [-1, -1, 0, 2, 3, 2],
      fingers: [0, 0, 0, 1, 3, 2],
      baseFret: 1,
    },
    {
      name: 'Am',
      frets: [0, 0, 2, 2, 1, 0],
      fingers: [0, 0, 2, 3, 1, 0],
      baseFret: 1,
    },
  ];

  for (const chord of sampleChords) upsertChord(chord);

  console.log('Seeded chords:', sampleChords.map(c => c.name).join(', '));
}

if (require.main === module) {
  run();
}

module.exports = { run };
