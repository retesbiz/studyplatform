const router      = require('express').Router();
const pool        = require('../db/connection');
const requireAuth = require('../middleware/auth');

const XP_PER_CORRECT = 20;
const XP_LEVELS = [0,200,500,1000,2000,3500,5500,8500,12000,17000,23000,30000,40000,52000,67000,85000,106000,130000,158000,190000];
const LEVEL_NAMES = ['','Novice','Apprentice','Scholar','Adept','Expert','Veteran','Master','Grandmaster','Elite','Legend','Mythic','Transcendent','Ascendant','Immortal','Divine','Celestial','Cosmic','Eternal','Infinite','Omniscient'];

function calcLevel(xp) {
  let level = 1;
  for (let i = 0; i < XP_LEVELS.length; i++) {
    if (xp >= XP_LEVELS[i]) level = i + 1;
    else break;
  }
  return Math.min(level, 20);
}

// GET /api/quizzes
router.get('/', requireAuth, async (req, res) => {
  try {
    const [quizzes] = await pool.query(`
      SELECT q.*,
             COUNT(DISTINCT qq.id)  AS question_count,
             COUNT(DISTINCT qa.id)  AS attempt_count,
             MAX(qa.score)          AS best_score,
             MAX(qa.total)          AS best_total
      FROM quizzes q
      LEFT JOIN quiz_questions qq ON qq.quiz_id = q.id
      LEFT JOIN quiz_attempts  qa ON qa.quiz_id = q.id AND qa.user_id = ?
      GROUP BY q.id
      ORDER BY q.id
    `, [req.user.id]);
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/quizzes/:id  — returns quiz + questions (no correct answers exposed)
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const [[quiz]] = await pool.query('SELECT * FROM quizzes WHERE id = ?', [req.params.id]);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });

    const [questions] = await pool.query(
      'SELECT id, question, option_a, option_b, option_c, option_d, sort_order FROM quiz_questions WHERE quiz_id = ? ORDER BY RAND()',
      [req.params.id]
    );
    res.json({ ...quiz, questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/quizzes/:id/attempt
// body: { answers: { questionId: 'A'|'B'|'C'|'D', ... }, timeTaken: seconds }
router.post('/:id/attempt', requireAuth, async (req, res) => {
  const { answers = {}, timeTaken = 0 } = req.body;
  try {
    const [questions] = await pool.query(
      'SELECT id, correct_answer, explanation FROM quiz_questions WHERE quiz_id = ?',
      [req.params.id]
    );
    if (!questions.length) return res.status(404).json({ message: 'Quiz not found.' });

    const results = questions.map(q => ({
      id:          q.id,
      correct:     q.correct_answer,
      explanation: q.explanation,
      given:       answers[q.id] || null,
      isCorrect:   answers[q.id] === q.correct_answer,
    }));

    const score  = results.filter(r => r.isCorrect).length;
    const xpEarned = score * XP_PER_CORRECT;

    await pool.query(
      'INSERT INTO quiz_attempts (user_id, quiz_id, score, total, time_taken) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, req.params.id, score, questions.length, timeTaken]
    );

    // Award XP and recalculate level
    const [[user]] = await pool.query('SELECT xp, level FROM users WHERE id = ?', [req.user.id]);
    const oldLevel = user ? calcLevel(user.xp || 0) : 1;
    const newXp    = (user?.xp || 0) + xpEarned;
    const newLevel = calcLevel(newXp);
    await pool.query('UPDATE users SET xp = ?, level = ? WHERE id = ?', [newXp, newLevel, req.user.id]);

    res.json({
      score, total: questions.length, results,
      xpEarned, newXp, newLevel,
      leveledUp:  newLevel > oldLevel,
      levelName:  LEVEL_NAMES[newLevel] || 'Transcendent',
      nextLevelXp: XP_LEVELS[newLevel] || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/quizzes/attempts/history
router.get('/attempts/history', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT qa.*, q.title, q.subject, q.difficulty
      FROM quiz_attempts qa
      JOIN quizzes q ON q.id = qa.quiz_id
      WHERE qa.user_id = ?
      ORDER BY qa.completed_at DESC
      LIMIT 20
    `, [req.user.id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
