const mysql = require('mysql2/promise');
require('dotenv').config();

const uri = process.env.MYSQL_URL || process.env.DATABASE_URL;

let pool;

if (uri) {
  // Cloud MySQL via connection URL (Railway, PlanetScale, etc.)
  pool = mysql.createPool({
    uri,
    ssl:                { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit:    5,
  });
} else if (process.env.MYSQLHOST) {
  // Railway individual MySQL variables
  pool = mysql.createPool({
    host:               process.env.MYSQLHOST,
    port:               process.env.MYSQLPORT    || 3306,
    user:               process.env.MYSQLUSER,
    password:           process.env.MYSQLPASSWORD,
    database:           process.env.MYSQLDATABASE,
    ssl:                { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit:    5,
  });
} else {
  // Local development
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
