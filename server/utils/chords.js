// Build a minimal chord dataset for majors and minors used by seeder
// Each chord contains full fields: name, tuning, frets, fingers, baseFret

const majors = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
const minors = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'A#m', 'Fm', 'Cm', 'Gm', 'Dm'];

// Default shapes as placeholders; can be refined later per chord
const DEFAULT_TUNING = 'EADGBE';
const DEFAULT_FRETS = [0, 0, 0, 0, 0, 0];
const DEFAULT_FINGERS = [0, 0, 0, 0, 0, 0];
const DEFAULT_BASE_FRET = 1;

// Per-chord overrides with known shapes (expand over time as needed)
const overridesByName = {
  'C': {
  tuning: DEFAULT_TUNING,
  frets: [-1, 3, 2, 0, 1, 0],
  fingers: [0, 3, 2, 0, 1, 0],
  baseFret: 1,
  },
  'G': {
  tuning: DEFAULT_TUNING,
  frets: [3, 2, 0, 0, 0, 3],
  fingers: [2, 1, 0, 0, 0, 3],
  baseFret: 1,
  },
  'D': {
  tuning: DEFAULT_TUNING,
  frets: [-1, -1, 0, 2, 3, 2],
  fingers: [0, 0, 0, 1, 3, 2],
  baseFret: 1,
  },
  'A': {
  tuning: DEFAULT_TUNING,
  frets: [-1, 0, 2, 2, 2, 0],
  fingers: [0, 0, 1, 2, 3, 0],
  baseFret: 1,
  },
  'E': {
  tuning: DEFAULT_TUNING,
  frets: [0, 2, 2, 1, 0, 0],
  fingers: [0, 2, 3, 1, 0, 0],
  baseFret: 1,
  },
  'B': {
  tuning: DEFAULT_TUNING,
  frets: [-1, 2, 4, 4, 4, 2],
  fingers: [0, 1, 2, 3, 4, 1],
  baseFret: 1,
  },
  'F#': {
  tuning: DEFAULT_TUNING,
  frets: [2, 4, 4, 3, 2, 2],
  fingers: [1, 3, 4, 2, 1, 1],
  baseFret: 1,
  },
  'C#': {
  tuning: DEFAULT_TUNING,
  frets: [-1, 4, 6, 6, 6, 4],
  fingers: [0, 1, 2, 3, 4, 1],
  baseFret: 1,
  },
  'G#': {
  tuning: DEFAULT_TUNING,
  frets: [4, 6, 6, 5, 4, 4],
  fingers: [1, 3, 4, 2, 1, 1],
  baseFret: 1,
  },
  'D#': {
  tuning: DEFAULT_TUNING,
  frets: [-1, 6, 8, 8, 8, 6],
  fingers: [0, 1, 2, 3, 4, 1],
  baseFret: 1,
  },
  'A#': {
  tuning: DEFAULT_TUNING,
  frets: [6, 8, 8, 7, 6, 6],
  fingers: [1, 3, 4, 2, 1, 1],
  baseFret: 1,
  },
  'F': {
  tuning: DEFAULT_TUNING,
  frets: [1, 3, 3, 2, 1, 1],
  fingers: [1, 3, 4, 2, 1, 1],
  baseFret: 1,
  },
  'Am': {
  tuning: DEFAULT_TUNING,
  frets: [0, 0, 2, 2, 1, 0],
  fingers: [0, 0, 2, 3, 1, 0],
  baseFret: 1,
  },
  'Em': {
  tuning: DEFAULT_TUNING,
  frets: [0, 2, 2, 0, 0, 0],
  fingers: [0, 2, 3, 0, 0, 0],
  baseFret: 1,
  },
  'Bm': {
  tuning: DEFAULT_TUNING,
  frets: [-1, 2, 4, 4, 3, 2],
  fingers: [0, 1, 3, 4, 2, 1],
  baseFret: 1,
  },
  'F#m': {
  tuning: DEFAULT_TUNING,
  frets: [2, 4, 4, 2, 2, 2],
  fingers: [1, 2, 3, 1, 1, 1],
  baseFret: 1,
  },
  'C#m': {
  tuning: DEFAULT_TUNING,
  frets: [-1, 4, 6, 6, 5, 4],
  fingers: [0, 1, 3, 4, 2, 1],
  baseFret: 1,
  },
  'G#m': {
  tuning: DEFAULT_TUNING,
  frets: [4, 6, 6, 4, 4, 4],
  fingers: [1, 2, 3, 1, 1, 1],
  baseFret: 1,
  },
  'D#m': {
  tuning: DEFAULT_TUNING,
  frets: [-1, 6, 8, 8, 7, 6],
  fingers: [0, 1, 3, 4, 2, 1],
  baseFret: 1,
  },
  'A#m': {
  tuning: DEFAULT_TUNING,
  frets: [6, 8, 8, 6, 6, 6],
  fingers: [1, 2, 3, 1, 1, 1],
  baseFret: 1,
  },
  'Fm': {
  tuning: DEFAULT_TUNING,
  frets: [1, 3, 3, 1, 1, 1],
  fingers: [1, 2, 3, 1, 1, 1],
  baseFret: 1,
  },
  'Cm': {
  tuning: DEFAULT_TUNING,
  frets: [-1, 3, 5, 5, 4, 3],
  fingers: [0, 1, 3, 4, 2, 1],
  baseFret: 1,
  },
  'Gm': {
  tuning: DEFAULT_TUNING,
  frets: [3, 5, 5, 3, 3, 3],
  fingers: [1, 2, 3, 1, 1, 1],
  baseFret: 1,
  },
  'Dm': {
  tuning: DEFAULT_TUNING,
  frets: [-1, -1, 0, 2, 3, 1],
  fingers: [0, 0, 0, 2, 3, 1],
  baseFret: 1,
  },
  };

const chords = [...majors, ...minors].map((name) => ({
  name,
  tuning: (overridesByName[name] && overridesByName[name].tuning) || DEFAULT_TUNING,
  frets: (overridesByName[name] && overridesByName[name].frets) || DEFAULT_FRETS,
  fingers: (overridesByName[name] && overridesByName[name].fingers) || DEFAULT_FINGERS,
  baseFret: (overridesByName[name] && overridesByName[name].baseFret) || DEFAULT_BASE_FRET,
}));

module.exports = { chords };


