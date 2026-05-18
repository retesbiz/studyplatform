const router      = require('express').Router();
const pool        = require('../db/connection');
const requireAuth = require('../middleware/auth');

// GET /api/dashboard/stats
router.get('/stats', requireAuth, async (req, res) => {
  const uid = req.user.id;
  try {
    const [[enrolled]]  = await pool.query('SELECT COUNT(*) AS n FROM enrollments WHERE user_id = ? AND completed = 0', [uid]);
    const [[completed]] = await pool.query('SELECT COUNT(*) AS n FROM enrollments WHERE user_id = ? AND completed = 1', [uid]);
    const [[notes]]     = await pool.query('SELECT COUNT(*) AS n FROM notes WHERE user_id = ?', [uid]);
    const [[quizzes]]   = await pool.query('SELECT COUNT(*) AS n FROM quiz_attempts WHERE user_id = ?', [uid]);
    const [[avgScore]]  = await pool.query('SELECT AVG(score/total*100) AS avg FROM quiz_attempts WHERE user_id = ? AND total > 0', [uid]);

    // Simple streak: count distinct days with activity (notes + quiz attempts) going back from today
    const [[streakRow]] = await pool.query(`
      SELECT COUNT(DISTINCT day) AS streak FROM (
        SELECT DATE(created_at) AS day FROM notes          WHERE user_id = ?
        UNION ALL
        SELECT DATE(completed_at)       FROM quiz_attempts WHERE user_id = ?
      ) t
      WHERE day >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `, [uid, uid]);

    res.json({
      enrolledCourses:   enrolled.n,
      completedCourses:  completed.n,
      notesCreated:      notes.n,
      quizzesCompleted:  quizzes.n,
      averageScore:      avgScore.avg ? Math.round(avgScore.avg) : 0,
      streak:            streakRow.streak,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/dashboard/courses  — in-progress courses for "Continue Learning"
router.get('/courses', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, e.progress, e.enrolled_at
      FROM enrollments e
      JOIN courses c ON c.id = e.course_id
      WHERE e.user_id = ? AND e.completed = 0
      ORDER BY e.updated_at DESC
      LIMIT 4
    `, [req.user.id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/dashboard/activity  — recent notes + quiz attempts
router.get('/activity', requireAuth, async (req, res) => {
  const uid = req.user.id;
  try {
    const [noteAct] = await pool.query(`
      SELECT 'note' AS type, title, subject, updated_at AS ts
      FROM notes WHERE user_id = ? ORDER BY updated_at DESC LIMIT 5
    `, [uid]);

    const [quizAct] = await pool.query(`
      SELECT 'quiz' AS type, q.title, q.subject, qa.score, qa.total, qa.completed_at AS ts
      FROM quiz_attempts qa JOIN quizzes q ON q.id = qa.quiz_id
      WHERE qa.user_id = ? ORDER BY qa.completed_at DESC LIMIT 5
    `, [uid]);

    const combined = [...noteAct, ...quizAct]
      .sort((a, b) => new Date(b.ts) - new Date(a.ts))
      .slice(0, 8);

    res.json(combined);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
