// feedbackController.js
import pool from '../db/db.js';

// Controller function to handle feedback submission
export const feedBack = async (req, res) => {
  const { helpful, response = null, question = null, context = null, model = null } = req.body;

  // Validate incoming data
  if (typeof helpful !== 'boolean') {
    return res.status(400).send('Invalid data');
  }

  try {
    // Insert feedback into the database, allowing some fields to be optional
    const query = `
      INSERT INTO feedback (helpful, response, question, context, model)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    const values = [helpful, response, question, context, model];

    const result = await pool.query(query, values);
    res.status(200).send(`Feedback submitted successfully with ID: ${result.rows[0].id}`);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Failed to save feedback');
  }
};
