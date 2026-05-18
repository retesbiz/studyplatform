const router      = require('express').Router();
const pool        = require('../db/connection');
const requireAuth = require('../middleware/auth');

// GET /api/courses  ?search=&category=&level=&tab=enrolled|all|completed
router.get('/', requireAuth, async (req, res) => {
  const { search = '', category = '', level = '', tab = 'all' } = req.query;
  try {
    let sql = `
      SELECT c.*,
             e.progress,
             e.completed,
             e.enrolled_at,
             CASE WHEN e.id IS NOT NULL THEN 1 ELSE 0 END AS enrolled
      FROM courses c
      LEFT JOIN enrollments e ON e.course_id = c.id AND e.user_id = ?
    `;
    const params = [req.user.id];
    const conditions = [];

    if (search)   { conditions.push('(c.title LIKE ? OR c.subject LIKE ? OR c.description LIKE ?)'); params.push(`%${search}%`, `%${search}%`, `%${search}%`); }
    if (category) { conditions.push('c.subject = ?'); params.push(category); }
    if (level)    { conditions.push('c.level = ?');   params.push(level); }
    if (tab === 'enrolled')  conditions.push('e.id IS NOT NULL AND e.completed = 0');
    if (tab === 'completed') conditions.push('e.completed = 1');

    if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
    sql += ' ORDER BY c.id';

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/courses/categories
router.get('/categories', requireAuth, async (req, res) => {
  const [rows] = await pool.query('SELECT DISTINCT subject FROM courses ORDER BY subject');
  res.json(rows.map(r => r.subject));
});

// POST /api/courses/:id/enroll
router.post('/:id/enroll', requireAuth, async (req, res) => {
  try {
    await pool.query(
      'INSERT IGNORE INTO enrollments (user_id, course_id) VALUES (?, ?)',
      [req.user.id, req.params.id]
    );
    res.json({ message: 'Enrolled successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// PATCH /api/courses/:id/progress
router.patch('/:id/progress', requireAuth, async (req, res) => {
  const { progress } = req.body;
  try {
    const completed = progress >= 100 ? 1 : 0;
    await pool.query(
      'UPDATE enrollments SET progress = ?, completed = ? WHERE user_id = ? AND course_id = ?',
      [Math.min(100, Math.max(0, progress)), completed, req.user.id, req.params.id]
    );
    res.json({ message: 'Progress updated.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
