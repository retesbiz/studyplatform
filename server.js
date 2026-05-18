const app  = require('./app');
const pool = require('./db/connection');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

async function initDb() {
  const sql = fs.readFileSync(path.join(__dirname, 'db/schema.sql'), 'utf8');
  const statements = sql.split(';').map(s => s.trim()).filter(Boolean);
  for (const stmt of statements) {
    await pool.query(stmt).catch(() => {});
  }
  console.log('Database ready.');
}

initDb().then(() => {
  app.listen(PORT, () => console.log(`StudyNest running on port ${PORT}`));
}).catch(err => {
  console.error('DB init failed:', err);
  process.exit(1);
});
