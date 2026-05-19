const router      = require('express').Router();
const bcrypt      = require('bcryptjs');
const pool        = require('../db/connection');
const requireAuth = require('../middleware/auth');

const XP_LEVELS = [0, 200, 500, 1000, 2000, 3500, 5500, 8500, 12000, 20000];
const LEVEL_NAMES = ['','Novice','Apprentice','Scholar','Adept','Expert','Master','Grandmaster','Legend','Mythic','Transcendent'];

function publicUser(row) {
  const xp    = row.xp    || 0;
  const level = row.level || 1;
  const nextXp = XP_LEVELS[level] || null;
  const prevXp = XP_LEVELS[level - 1] || 0;
  return {
    id:           row.id,
    firstName:    row.first_name,
    lastName:     row.last_name,
    email:        row.email,
    avatar:       row.avatar,
    bio:          row.bio,
    university:   row.university,
    field:        row.field,
    role:         row.role,
    createdAt:    row.created_at,
    xp,
    level,
    levelName:    LEVEL_NAMES[level] || 'Transcendent',
    nextLevelXp:  nextXp,
    prevLevelXp:  prevXp,
    xpProgress:   nextXp ? Math.round((xp - prevXp) / (nextXp - prevXp) * 100) : 100,
  };
}

// GET /api/users/me
router.get('/me', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    if (!rows.length) return res.status(404).json({ message: 'User not found.' });
    res.json(publicUser(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// PATCH /api/users/me
router.patch('/me', requireAuth, async (req, res) => {
  const { firstName, lastName, bio, university, field, avatar } = req.body;
  try {
    await pool.query(
      `UPDATE users SET first_name=?, last_name=?, bio=?, university=?, field=?, avatar=? WHERE id=?`,
      [firstName, lastName, bio, university, field, avatar, req.user.id]
    );
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    res.json(publicUser(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// DELETE /api/users/me
router.delete('/me', requireAuth, async (req, res) => {
  const id = req.user.id;
  try {
    await pool.query('DELETE FROM quiz_attempts WHERE user_id = ?', [id]);
    await pool.query('DELETE FROM enrollments WHERE user_id = ?', [id]);
    await pool.query('DELETE FROM notes WHERE user_id = ?', [id]);
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'Account deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// PATCH /api/users/me/password
router.patch('/me/password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({ message: 'New password must be at least 8 characters.' });
  }
  try {
    const [rows] = await pool.query('SELECT password FROM users WHERE id = ?', [req.user.id]);
    const match  = await bcrypt.compare(currentPassword, rows[0].password);
    if (!match) return res.status(401).json({ message: 'Current password is incorrect.' });
    const hash = await bcrypt.hash(newPassword, 12);
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [hash, req.user.id]);
    res.json({ message: 'Password updated.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
