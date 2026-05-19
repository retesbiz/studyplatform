require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check — shows DB + env status
app.get('/api/health', async (req, res) => {
  const pool = require('./db/connection');
  const vars = {
    MYSQL_URL:    !!process.env.MYSQL_URL,
    DATABASE_URL: !!process.env.DATABASE_URL,
    MYSQLHOST:    !!process.env.MYSQLHOST,
    JWT_SECRET:   !!process.env.JWT_SECRET,
    SITE_URL:     process.env.SITE_URL || '(not set)',
    NODE_ENV:     process.env.NODE_ENV || '(not set)',
  };
  try {
    await pool.query('SELECT 1');
    const [tables] = await pool.query(`SHOW TABLES`);
    const tableNames = tables.map(r => Object.values(r)[0]);
    res.json({ status: 'ok', db: 'connected', tables: tableNames, vars });
  } catch (err) {
    res.status(500).json({ status: 'error', db: err.message, vars });
  }
});

app.use('/api/auth',      require('./routes/auth'));
app.use('/api/users',     require('./routes/users'));
app.use('/api/courses',   require('./routes/courses'));
app.use('/api/notes',     require('./routes/notes'));
app.use('/api/quizzes',   require('./routes/quizzes'));
app.use('/api/dashboard',    require('./routes/dashboard'));
app.use('/api/discussions',  require('./routes/discussions'));
app.use('/api/leaderboard', require('./routes/leaderboard'));

// Temporary admin boost — sets the caller to level 10 + inserts demo quiz history
app.post('/api/admin/boost-me', async (req, res) => {
  const jwt  = require('jsonwebtoken');
  const pool = require('./db/connection');
  try {
    const auth = (req.headers.authorization || '').replace('Bearer ', '');
    const { id } = jwt.verify(auth, process.env.JWT_SECRET);

    // Ensure xp/level columns exist (migration may not have run)
    try { await pool.query(`ALTER TABLE users ADD COLUMN xp INT NOT NULL DEFAULT 0`); } catch(e) {}
    try { await pool.query(`ALTER TABLE users ADD COLUMN level INT NOT NULL DEFAULT 1`); } catch(e) {}

    await pool.query('UPDATE users SET xp = 30000, level = 12 WHERE id = ?', [id]);
    await pool.query('DELETE FROM quiz_attempts WHERE user_id = ?', [id]);

    const attempts = [
      [id,1,9,10,480],[id,2,8,10,520],[id,3,7,10,610],
      [id,4,10,10,390],[id,5,8,10,450],[id,6,9,10,500],
      [id,7,7,10,580],[id,8,10,10,420],[id,9,6,10,660],
    ];
    for (const a of attempts) {
      await pool.query(
        'INSERT INTO quiz_attempts (user_id, quiz_id, score, total, time_taken) VALUES (?,?,?,?,?)', a
      );
    }
    res.json({ ok: true, message: 'Boosted to level 10 with quiz history.' });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
