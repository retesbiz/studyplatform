const router      = require('express').Router();
const requireAuth = require('../middleware/auth');

const SYSTEM_PROMPT = `You are StudyNest AI, an expert study tutor for university students. You help students deeply understand topics across:
- Cybersecurity: cryptography, web security (OWASP, XSS, SQLi, CSRF), network security
- Databases: SQL, MySQL, query optimisation, transactions, indexing, database design
- Data Science & Machine Learning: Python, pandas, NumPy, scikit-learn, neural networks, regression, classification
- Web Development: HTML5, CSS3, JavaScript (ES6+), Node.js, Express.js, React, REST APIs
- Cloud Computing: AWS (EC2, S3, Lambda, RDS), serverless, deployment, DevOps basics

Your personality: encouraging, clear, and concise. You explain things step by step with real examples. You use analogies to make hard concepts click. When relevant, you include short code examples. You format responses with **bold** for key terms, bullet points for lists, and short paragraphs — never walls of text.

If a student seems stuck or confused, offer to explain from a different angle. Always end with a quick "want me to go deeper on any part?" if the topic has more depth worth exploring.`;

router.post('/chat', requireAuth, async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ message: 'AI_KEY_MISSING' });
  }

  const { message, history = [] } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ message: 'Message is required.' });
  }

  const messages = [
    ...history.slice(-10),   // keep last 10 turns for context
    { role: 'user', content: message.trim() },
  ];

  try {
    const Anthropic = require('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // Stream the response as SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const stream = client.messages.stream({
      model:      'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system:     SYSTEM_PROMPT,
      messages,
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('AI error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ message: 'AI service error.' });
    } else {
      res.write(`data: ${JSON.stringify({ error: 'AI service error.' })}\n\n`);
      res.end();
    }
  }
});

module.exports = router;
