const express = require('express');
const cors = require('cors');
const { initSchema, listChords, getChordById, getChordByName } = require('./db');

// Start the HTTP API server
function createServer() {
  initSchema();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  // GET /chords -> list of {id, name}
  app.get('/chords', (_req, res) => {
    try {
      const rows = listChords();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to list chords' });
    }
  });

  // GET /chords/:idOrName -> full chord
  app.get('/chords/:idOrName', (req, res) => {
    try {
      const { idOrName } = req.params;
      const byId = Number(idOrName);
      const row = Number.isFinite(byId) ? getChordById(byId) : getChordByName(idOrName);
      if (!row) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      const result = {
        id: row.id,
        name: row.name,
        tuning: row.tuning,
        frets: JSON.parse(row.frets),
        fingers: JSON.parse(row.fingers),
        baseFret: row.baseFret,
      };
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch chord' });
    }
  });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

if (require.main === module) {
  createServer();
}

module.exports = { createServer };
