import pool from './db.js';

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
    console.log('Feedback table created or already exists.');
  } catch (err) {
    console.error('Error creating table:', err.message);
  } finally {
    await pool.end();
  }
})();
