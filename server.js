const app  = require('./app');
const pool = require('./db/connection');

const PORT = process.env.PORT || 3000;

async function initDb() {
  const fs   = require('fs');
  const path = require('path');
  const sql  = fs.readFileSync(path.join(__dirname, 'db/schema.sql'), 'utf8');

  // Split on semicolons but ignore empty chunks
  const isCloud = !!(process.env.DATABASE_URL || process.env.MYSQL_URL || process.env.MYSQLHOST);
  const statements = sql
    .replace(/--.*$/gm, '')        // strip comments
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    // Skip CREATE DATABASE / USE on cloud — DB already exists with a different name
    .filter(s => !isCloud || (!/^CREATE DATABASE/i.test(s) && !/^USE /i.test(s)));

  for (const stmt of statements) {
    try {
      await pool.query(stmt);
    } catch (err) {
      // Ignore "already exists" and duplicate errors during init
      if (!['ER_TABLE_EXISTS_ERROR', 'ER_DUP_ENTRY', 'ER_DUP_KEYNAME'].includes(err.code)) {
        console.warn('DB init warning:', err.message);
      }
    }
  }
  console.log('Database ready.');
}

initDb()
  .then(() => app.listen(PORT, () => console.log(`StudyNest running on port ${PORT}`)))
  .catch(err => { console.error('Startup failed:', err.message); process.exit(1); });
