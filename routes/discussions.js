const router      = require('express').Router();
const pool        = require('../db/connection');
const requireAuth = require('../middleware/auth');

// GET /api/discussions  ?sort=newest|active|mine  &category=
router.get('/', requireAuth, async (req, res) => {
  const { sort = 'newest', category = '' } = req.query;
  try {
    let sql = `
      SELECT d.*, u.first_name, u.last_name, u.avatar
      FROM discussions d
      JOIN users u ON u.id = d.user_id`;
    const params = [];
    const conds  = [];

    if (category) { conds.push('d.category = ?'); params.push(category); }
    if (sort === 'mine') { conds.push('d.user_id = ?'); params.push(req.user.id); }
    if (conds.length) sql += ' WHERE ' + conds.join(' AND ');

    sql += sort === 'active'
      ? ' ORDER BY d.reply_count DESC, d.updated_at DESC'
      : ' ORDER BY d.created_at DESC';

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/discussions
router.post('/', requireAuth, async (req, res) => {
  const { title, body, category = 'General' } = req.body;
  if (!title?.trim() || !body?.trim())
    return res.status(400).json({ message: 'Title and body are required.' });
  try {
    const [result] = await pool.query(
      'INSERT INTO discussions (user_id, title, body, category) VALUES (?,?,?,?)',
      [req.user.id, title.trim(), body.trim(), category]
    );
    const [rows] = await pool.query(
      'SELECT d.*, u.first_name, u.last_name, u.avatar FROM discussions d JOIN users u ON u.id = d.user_id WHERE d.id = ?',
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/discussions/:id  — single discussion + replies
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const [disc] = await pool.query(
      'SELECT d.*, u.first_name, u.last_name, u.avatar FROM discussions d JOIN users u ON u.id = d.user_id WHERE d.id = ?',
      [req.params.id]
    );
    if (!disc.length) return res.status(404).json({ message: 'Not found.' });

    const [replies] = await pool.query(
      `SELECT r.*, u.first_name, u.last_name, u.avatar
       FROM discussion_replies r JOIN users u ON u.id = r.user_id
       WHERE r.discussion_id = ? ORDER BY r.created_at ASC`,
      [req.params.id]
    );
    res.json({ ...disc[0], replies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/discussions/:id/reply
router.post('/:id/reply', requireAuth, async (req, res) => {
  const { body } = req.body;
  if (!body?.trim()) return res.status(400).json({ message: 'Reply cannot be empty.' });
  try {
    await pool.query(
      'INSERT INTO discussion_replies (discussion_id, user_id, body) VALUES (?,?,?)',
      [req.params.id, req.user.id, body.trim()]
    );
    await pool.query(
      'UPDATE discussions SET reply_count = reply_count + 1, updated_at = NOW() WHERE id = ?',
      [req.params.id]
    );
    const [rows] = await pool.query(
      'SELECT r.*, u.first_name, u.last_name, u.avatar FROM discussion_replies r JOIN users u ON u.id = r.user_id WHERE r.discussion_id = ? ORDER BY r.created_at ASC',
      [req.params.id]
    );
    res.status(201).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// DELETE /api/discussions/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT user_id FROM discussions WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Not found.' });
    if (rows[0].user_id !== req.user.id) return res.status(403).json({ message: 'Not your post.' });
    await pool.query('DELETE FROM discussions WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// DELETE /api/discussions/:id/reply/:rid
router.delete('/:id/reply/:rid', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT user_id FROM discussion_replies WHERE id = ?', [req.params.rid]);
    if (!rows.length) return res.status(404).json({ message: 'Not found.' });
    if (rows[0].user_id !== req.user.id) return res.status(403).json({ message: 'Not your reply.' });
    await pool.query('DELETE FROM discussion_replies WHERE id = ?', [req.params.rid]);
    await pool.query('UPDATE discussions SET reply_count = GREATEST(reply_count - 1, 0) WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
