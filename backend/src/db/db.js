import pkg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool, Client } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const {
  DATABASE_URL,
  PG_USER = 'postgres',
  PG_HOST = '127.0.0.1',
  PG_PASSWORD = 'password', 
  PG_PORT = 5432,
  PG_DB_NAME = 'feedback',
} = process.env;

// Use DATABASE_URL for Heroku or local connection details
const connectionString = DATABASE_URL || `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DB_NAME}`;

const pool = new Pool({
  connectionString,
  ssl: DATABASE_URL ? { rejectUnauthorized: false } : false, 
});

(async () => {
  // If running locally, ensure the database exists
  if (!DATABASE_URL) {
    const adminClient = new Client({
      user: PG_USER,
      host: PG_HOST,
      database: 'postgres', 
      password: PG_PASSWORD,
      port: PG_PORT,
    });

    try {
      await adminClient.connect();
      console.log('Connected to PostgreSQL admin database');

      // Check if the target database exists
      const dbExistsQuery = `SELECT 1 FROM pg_database WHERE datname = $1;`;
      const dbExistsResult = await adminClient.query(dbExistsQuery, [PG_DB_NAME]);

      if (dbExistsResult.rowCount === 0) {
        console.log(`Database "${PG_DB_NAME}" does not exist. Creating it...`);
        await adminClient.query(`CREATE DATABASE ${PG_DB_NAME};`);
        console.log(`Database "${PG_DB_NAME}" created successfully.`);
      } else {
        console.log(`Database "${PG_DB_NAME}" already exists.`);
      }
    } catch (err) {
      console.error('Error setting up PostgreSQL database:', err.message, err.stack);
    } finally {
      await adminClient.end();
    }
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
    console.log('Ensured table "feedback" exists.');
  } catch (err) {
    console.error('Error creating table in PostgreSQL database:', err.message, err.stack);
  } finally {
    await pool.end();
  }
})();

export default pool;

