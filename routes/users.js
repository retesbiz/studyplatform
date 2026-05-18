const router      = require('express').Router();
const bcrypt      = require('bcryptjs');
const pool        = require('../db/connection');
const requireAuth = require('../middleware/auth');

function publicUser(row) {
  return {
    id:         row.id,
    firstName:  row.first_name,
    lastName:   row.last_name,
    email:      row.email,
    avatar:     row.avatar,
    bio:        row.bio,
    university: row.university,
    field:      row.field,
    role:       row.role,
    createdAt:  row.created_at,
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
