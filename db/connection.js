const mysql = require('mysql2/promise');
require('dotenv').config();

// Railway injects MYSQL_URL or DATABASE_URL; fall back to individual vars for local dev
const uri = process.env.MYSQL_URL || process.env.DATABASE_URL;

let pool;

if (uri) {
  pool = mysql.createPool({
    uri,
    ssl: { rejectUnauthorized: false },
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
