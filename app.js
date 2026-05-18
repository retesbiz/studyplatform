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
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/ai',        require('./routes/ai'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
