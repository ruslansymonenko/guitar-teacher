const express = require('express');
const cors = require('cors');
const { initSchema } = require('./database/db');
const chordsRouter = require('./routes/chords.routes');

// Start the HTTP API server
function createServer() {
  initSchema();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use('/chords', chordsRouter);

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

if (require.main === module) {
  createServer();
}

module.exports = { createServer };
