require('dotenv').config();
const pool = require('./connection');

(async () => {
  await pool.query(`ALTER TABLE users MODIFY COLUMN password VARCHAR(255) DEFAULT NULL`);
  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS oauth_provider VARCHAR(20) DEFAULT NULL AFTER referral`);
  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS oauth_id VARCHAR(255) DEFAULT NULL AFTER oauth_provider`);
  console.log('Migration complete.');
  process.exit(0);
})().catch(err => { console.error(err); process.exit(1); });
