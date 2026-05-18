const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

if (process.env.DATABASE_URL) {
  // PlanetScale / cloud MySQL — connection URL format
  pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: true },
    waitForConnections: true,
    connectionLimit: 5,
  });
} else {
  pool = mysql.createPool({
    host:               process.env.DB_HOST     || 'localhost',
    port:               process.env.DB_PORT     || 3306,
    user:               process.env.DB_USER     || 'root',
    password:           process.env.DB_PASSWORD || '',
    database:           process.env.DB_NAME     || 'studynest',
    waitForConnections: true,
    connectionLimit:    10,
  });
}

module.exports = pool;
