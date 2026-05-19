const router      = require('express').Router();
const pool        = require('../db/connection');
const requireAuth = require('../middleware/auth');

const LEVEL_NAMES = ['','Novice','Apprentice','Scholar','Adept','Expert','Veteran','Master','Grandmaster','Elite','Legend','Mythic','Transcendent','Ascendant','Immortal','Divine','Celestial','Cosmic','Eternal','Infinite','Omniscient'];

// GET /api/leaderboard?limit=50
router.get('/', requireAuth, async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 50, 100);
  try {
    const [rows] = await pool.query(`
      SELECT
        u.id,
        u.first_name,
        u.last_name,
        u.avatar,
        COALESCE(u.xp, 0)    AS xp,
        COALESCE(u.level, 1)  AS level,
        COUNT(DISTINCT qa.id) AS quizzes_completed,
        COALESCE(MAX(ROUND(qa.score / qa.total * 100)), 0) AS best_score
      FROM users u
      LEFT JOIN quiz_attempts qa ON qa.user_id = u.id
      GROUP BY u.id
      ORDER BY u.xp DESC, u.level DESC, COUNT(DISTINCT qa.id) DESC
      LIMIT ?
    `, [limit]);

    const result = rows.map((row, i) => ({
      rank:              i + 1,
      id:                row.id,
      firstName:         row.first_name,
      lastName:          row.last_name,
      avatar:            row.avatar,
      xp:                row.xp,
      level:             row.level,
      levelName:         LEVEL_NAMES[row.level] || 'Omniscient',
      quizzesCompleted:  row.quizzes_completed,
      bestScore:         row.best_score,
      isMe:              row.id === req.user.id,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
