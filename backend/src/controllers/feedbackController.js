import pool from '../db/db.js';
import Joi from 'joi'; 

// Define the schema for request validation
const feedbackSchema = Joi.object({
  helpful: Joi.boolean().required(),
  response: Joi.string().allow(null, ''), 
  question: Joi.string().allow(null, ''),
  context: Joi.string().allow(null, ''),
  model: Joi.string().allow(null, ''),
});

// Controller function to handle feedback submission
export const feedBack = async (req, res) => {
  const { error, value } = feedbackSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: `Validation error: ${error.message}` });
  }

  const { helpful, response, question, context, model } = value;

  try {
    const query = `
      INSERT INTO feedback (helpful, response, question, context, model)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    const values = [helpful, response, question, context, model];

    const result = await pool.query(query, values);

    res.status(200).json({
      message: 'Feedback submitted successfully',
      id: result.rows[0].id,
    });
  } catch (err) {
    console.error('Database error:', err);

    // Specific PostgreSQL error handling
    if (err.code === '23505') {
      res.status(409).json({ error: 'Duplicate entry' });
    } else {
      res.status(500).json({ error: 'Failed to save feedback' });
    }
  }
};
