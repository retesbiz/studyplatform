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

// Seed fake leaderboard users (one-time, safe to re-run — skips if already seeded)
app.post('/api/admin/seed-users', async (req, res) => {
  const bcrypt = require('bcryptjs');
  const pool   = require('./db/connection');
  try {
    const hash = await bcrypt.hash('Password123!', 10);
    const avatars = ['🦊','🐧','🦉','🤖','🐻','🐼','🦁','🐯','🐸','🦋','🐙','🦄','🐳','🦅','🐺'];
    const fakeUsers = [
      ['Liam','Chen',9800,8],['Sophia','Nguyen',15200,9],['Marcus','Okafor',7400,7],
      ['Aisha','Patel',22000,10],['Jake','Torres',3200,6],['Mei','Yamamoto',45000,13],
      ['Carlos','Rivera',1800,5],['Emma','Johansson',58000,14],['Kwame','Asante',900,4],
      ['Priya','Singh',31000,12],['Noah','Müller',12500,9],['Fatima','Al-Hassan',67500,15],
      ['Ethan','Park',5000,7],['Isabella','Rossi',88000,16],['Zara','Williams',400,3],
      ['Diego','Fernandez',2600,6],['Yuki','Tanaka',19000,10],['Amara','Diallo',110000,17],
      ['Ryan','O\'Brien',8000,8],['Luna','Petrov',38000,13],
    ];

    let inserted = 0;
    for (let i = 0; i < fakeUsers.length; i++) {
      const [fn, ln, xp, level] = fakeUsers[i];
      const email  = fn.toLowerCase() + '.' + ln.toLowerCase().replace(/[^a-z]/g,'') + '@studynest.demo';
      const avatar = avatars[i % avatars.length];
      try {
        const [r] = await pool.query(
          `INSERT INTO users (first_name,last_name,email,password,avatar,university,field,xp,level)
           VALUES (?,?,?,?,?,?,?,?,?)`,
          [fn, ln, email, hash, avatar,
           ['MIT','Stanford','Oxford','ETH Zurich','NUS','UNSW','UCL','TU Berlin'][i % 8],
           ['Computer Science','Cybersecurity','Data Science','Software Engineering','Information Technology'][i % 5],
           xp, level]
        );
        const uid = r.insertId;
        // Add quiz attempts spread across quizzes
        const numAttempts = 3 + (i % 6);
        for (let q = 1; q <= numAttempts; q++) {
          const quizId = ((i + q) % 9) + 1;
          const score  = 5 + Math.floor(Math.random() * 6);
          await pool.query(
            'INSERT INTO quiz_attempts (user_id,quiz_id,score,total,time_taken) VALUES (?,?,?,10,?)',
            [uid, quizId, score, 300 + Math.floor(Math.random() * 400)]
          ).catch(() => {});
        }
        inserted++;
      } catch(e) {
        if (!e.message.includes('Duplicate')) throw e;
      }
    }
    res.json({ ok: true, inserted, message: `${inserted} demo users added.` });
  } catch(e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

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
