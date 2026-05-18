const router      = require('express').Router();
const pool        = require('../db/connection');
const requireAuth = require('../middleware/auth');

// GET /api/notes  ?search=&subject=
router.get('/', requireAuth, async (req, res) => {
  const { search = '', subject = '' } = req.query;
  let sql = 'SELECT * FROM notes WHERE user_id = ?';
  const params = [req.user.id];
  if (search)  { sql += ' AND (title LIKE ? OR content LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
  if (subject) { sql += ' AND subject = ?'; params.push(subject); }
  sql += ' ORDER BY updated_at DESC';
  try {
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/notes/:id
router.get('/:id', requireAuth, async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM notes WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.id]
  );
  if (!rows.length) return res.status(404).json({ message: 'Note not found.' });
  res.json(rows[0]);
});

// POST /api/notes
router.post('/', requireAuth, async (req, res) => {
  const { title = 'Untitled Note', content = '', subject = '', tags = '' } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO notes (user_id, title, content, subject, tags) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, title, content, subject, tags]
    );
    const [rows] = await pool.query('SELECT * FROM notes WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// PUT /api/notes/:id
router.put('/:id', requireAuth, async (req, res) => {
  const { title, content, subject, tags } = req.body;
  try {
    const [check] = await pool.query(
      'SELECT id FROM notes WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (!check.length) return res.status(404).json({ message: 'Note not found.' });

    await pool.query(
      'UPDATE notes SET title = ?, content = ?, subject = ?, tags = ? WHERE id = ?',
      [title, content, subject, tags, req.params.id]
    );
    const [rows] = await pool.query('SELECT * FROM notes WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// DELETE /api/notes/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM notes WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (!result.affectedRows) return res.status(404).json({ message: 'Note not found.' });
    res.json({ message: 'Note deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/notes/subjects/list
router.get('/subjects/list', requireAuth, async (req, res) => {
  const [rows] = await pool.query(
    'SELECT DISTINCT subject FROM notes WHERE user_id = ? AND subject != "" ORDER BY subject',
    [req.user.id]
  );
  res.json(rows.map(r => r.subject));
});

module.exports = router;
