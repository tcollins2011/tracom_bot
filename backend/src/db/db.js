import pkg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool, Client } = pkg;

// Resolve the __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PostgreSQL connection to the default 'postgres' database
const adminClient = new Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres', // Default database
  password: 'k!rby0414',
  port: 5432,
});

// Target database configuration
const targetDatabase = 'feedback';
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: targetDatabase,
  password: 'k!rby0414',
  port: 5432,
});

(async () => {
  try {
    // Connect to the default 'postgres' database
    await adminClient.connect();
    console.log('Connected to PostgreSQL admin database');

    // Check if the target database exists
    const dbExistsQuery = `
      SELECT 1 FROM pg_database WHERE datname = $1;
    `;
    const dbExistsResult = await adminClient.query(dbExistsQuery, [targetDatabase]);

    // Create the target database if it doesn't exist
    if (dbExistsResult.rowCount === 0) {
      console.log(`Database "${targetDatabase}" does not exist. Creating it...`);
      const createDbQuery = `CREATE DATABASE ${targetDatabase};`;
      await adminClient.query(createDbQuery);
      console.log(`Database "${targetDatabase}" created successfully.`);
    } else {
      console.log(`Database "${targetDatabase}" already exists.`);
    }
  } catch (err) {
    console.error('Error setting up PostgreSQL database:', err.message, err.stack);
  } finally {
    // Close the admin connection
    await adminClient.end();
  }

  // Ensure the `feedback` table exists
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
    console.log('Ensured table "feedback" exists');
  } catch (err) {
    console.error('Error creating table in PostgreSQL database:', err.message, err.stack);
  }
})();

export default pool;
