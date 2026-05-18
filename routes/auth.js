const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const pool   = require('../db/connection');

// ── helpers ──────────────────────────────────────────────────────────────────

function makeToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

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
  };
}

function siteUrl(req) {
  // Use explicit env var first, then infer from request
  return process.env.SITE_URL ||
    `${req.protocol}://${req.get('host')}`;
}

// ── register ─────────────────────────────────────────────────────────────────

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, avatar, bio, university, field, referral } = req.body;

  if (!firstName || !email || !password)
    return res.status(400).json({ message: 'First name, email and password are required.' });
  if (password.length < 8)
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });

  try {
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length)
      return res.status(409).json({ message: 'An account with that email already exists.' });

    const hash = await bcrypt.hash(password, 12);
    const [result] = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, avatar, bio, university, field, referral)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName || '', email, hash,
       avatar || '🎓', bio || '', university || '', field || '', referral || '']
    );
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
    const user = rows[0];
    res.status(201).json({ token: makeToken(user), user: publicUser(user) });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: err.message });
  }
});

// ── login ─────────────────────────────────────────────────────────────────────

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required.' });

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length)
      return res.status(401).json({ message: 'Invalid email or password.' });

    const user = rows[0];
    if (!user.password)
      return res.status(401).json({ message: 'This account uses Google or GitHub to sign in.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Invalid email or password.' });

    res.json({ token: makeToken(user), user: publicUser(user) });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ── logout ────────────────────────────────────────────────────────────────────

router.post('/logout', (_req, res) => res.json({ message: 'Logged out.' }));

// ── Google OAuth ──────────────────────────────────────────────────────────────

router.get('/google', (req, res) => {
  if (!process.env.GOOGLE_CLIENT_ID)
    return res.redirect('/pages/login.html?error=oauth_not_configured');

  // Sign a short-lived state token to prevent CSRF
  const state = jwt.sign({ provider: 'google' }, process.env.JWT_SECRET, { expiresIn: '10m' });
  const callbackUrl = `${siteUrl(req)}/api/auth/google/callback`;

  const params = new URLSearchParams({
    client_id:     process.env.GOOGLE_CLIENT_ID,
    redirect_uri:  callbackUrl,
    response_type: 'code',
    scope:         'openid email profile',
    state,
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

router.get('/google/callback', async (req, res) => {
  const { code, state, error } = req.query;
  const base = '/public/pages';

  if (error) return res.redirect(`${base}/login.html?error=google_denied`);

  try {
    jwt.verify(state, process.env.JWT_SECRET);
  } catch {
    return res.redirect(`${base}/login.html?error=invalid_state`);
  }

  try {
    const callbackUrl = `${siteUrl(req)}/api/auth/google/callback`;

    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id:     process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri:  callbackUrl,
        grant_type:    'authorization_code',
      }),
    });
    const tokens = await tokenRes.json();
    if (!tokens.access_token) throw new Error('No access token from Google');

    // Get profile
    const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const profile = await profileRes.json();

    const user = await findOrCreateOAuthUser({
      email:     profile.email,
      firstName: profile.given_name || profile.name || '',
      lastName:  profile.family_name || '',
      avatar:    '🎓',
      provider:  'google',
      providerId: profile.id,
    });

    const token = makeToken(user);
    const userJson = encodeURIComponent(JSON.stringify(publicUser(user)));
    res.redirect(`${base}/auth-callback.html?token=${token}&user=${userJson}`);
  } catch (err) {
    console.error('Google OAuth error:', err);
    res.redirect(`${base}/login.html?error=google_failed`);
  }
});

// ── GitHub OAuth ──────────────────────────────────────────────────────────────

router.get('/github', (req, res) => {
  if (!process.env.GITHUB_CLIENT_ID)
    return res.redirect('/pages/login.html?error=oauth_not_configured');

  const state = jwt.sign({ provider: 'github' }, process.env.JWT_SECRET, { expiresIn: '10m' });
  const callbackUrl = `${siteUrl(req)}/api/auth/github/callback`;

  const params = new URLSearchParams({
    client_id:    process.env.GITHUB_CLIENT_ID,
    redirect_uri: callbackUrl,
    scope:        'user:email',
    state,
  });
  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
});

router.get('/github/callback', async (req, res) => {
  const { code, state, error } = req.query;
  const base = '/public/pages';

  if (error) return res.redirect(`${base}/login.html?error=github_denied`);

  try {
    jwt.verify(state, process.env.JWT_SECRET);
  } catch {
    return res.redirect(`${base}/login.html?error=invalid_state`);
  }

  try {
    const callbackUrl = `${siteUrl(req)}/api/auth/github/callback`;

    // Exchange code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/x-www-form-urlencoded',
        'Accept':        'application/json',
      },
      body: new URLSearchParams({
        client_id:     process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri:  callbackUrl,
      }),
    });
    const tokens = await tokenRes.json();
    if (!tokens.access_token) throw new Error('No access token from GitHub');

    // Get profile
    const [profileRes, emailsRes] = await Promise.all([
      fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${tokens.access_token}`, 'User-Agent': 'StudyNest' },
      }),
      fetch('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${tokens.access_token}`, 'User-Agent': 'StudyNest' },
      }),
    ]);
    const profile = await profileRes.json();
    const emails  = await emailsRes.json();

    const primaryEmail = (Array.isArray(emails) ? emails : [])
      .find(e => e.primary && e.verified)?.email || profile.email;
    if (!primaryEmail) throw new Error('No verified email on GitHub account');

    const nameParts = (profile.name || profile.login || '').split(' ');
    const user = await findOrCreateOAuthUser({
      email:      primaryEmail,
      firstName:  nameParts[0] || profile.login,
      lastName:   nameParts.slice(1).join(' '),
      avatar:     '🤖',
      provider:   'github',
      providerId: String(profile.id),
    });

    const token    = makeToken(user);
    const userJson = encodeURIComponent(JSON.stringify(publicUser(user)));
    res.redirect(`${base}/auth-callback.html?token=${token}&user=${userJson}`);
  } catch (err) {
    console.error('GitHub OAuth error:', err);
    res.redirect(`${base}/login.html?error=github_failed`);
  }
});

// ── shared OAuth helper ───────────────────────────────────────────────────────

async function findOrCreateOAuthUser({ email, firstName, lastName, avatar, provider, providerId }) {
  // Check by provider ID first, then email
  let [rows] = await pool.query(
    'SELECT * FROM users WHERE oauth_provider = ? AND oauth_id = ?',
    [provider, providerId]
  );
  if (rows.length) return rows[0];

  [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length) {
    // Link existing email account to OAuth
    await pool.query(
      'UPDATE users SET oauth_provider = ?, oauth_id = ? WHERE id = ?',
      [provider, providerId, rows[0].id]
    );
    return rows[0];
  }

  // New user
  const [result] = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password, avatar, oauth_provider, oauth_id)
     VALUES (?, ?, ?, NULL, ?, ?, ?)`,
    [firstName, lastName, email, avatar, provider, providerId]
  );
  const [newRows] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
  return newRows[0];
}

module.exports = router;
