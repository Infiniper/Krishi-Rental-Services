const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // ✅ Allow SSL connection
  },
  idleTimeoutMillis: 30000, // ⏳ Close idle connections after 30 sec
  connectionTimeoutMillis: 5000, // ⏳ Wait max 5 sec for new connections
});

// Test connection on startup
(async () => {
  try {
    await pool.query('SELECT 1'); // ✅ Simple test query
    console.log('✅ Connected to Neon DB!');
  } catch (err) {
    console.error('❌ Connection error:', err);
  }
})();

// Handles Connection Loss Gracefully
// pool.on('error', ...) ensures that if a connection fails, your app won’t crash.
pool.on('error', (err) => {
  console.error('❌ Unexpected DB error:', err);
});

module.exports = pool;
