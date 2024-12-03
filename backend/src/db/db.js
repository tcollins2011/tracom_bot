// db.js
import { Pool } from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve the __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PostgreSQL connection pool configuration
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Create the feedback table if it doesn't exist
(async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        helpful BOOLEAN NOT NULL,
        response TEXT,
        question TEXT,
        context TEXT,
        model TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(createTableQuery);
    console.log('Connected to PostgreSQL and ensured table exists');
  } catch (err) {
    console.error('Error setting up PostgreSQL database:', err);
  }
})();

export default pool;
