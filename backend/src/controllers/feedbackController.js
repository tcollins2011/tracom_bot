// Import the database connection
import db from '../db/db.js';

// Controller function to handle feedback submission
export const feedBack = (req, res) => {
  const {helpful, response = null, question = null, context = null, model = null } = req.body;

  // Validate incoming data
  if (typeof helpful !== 'boolean') {
    return res.status(400).send('Invalid data');
  }

  // Insert feedback into the database, allowing some fields to be optional
  db.run(
    `INSERT INTO feedback (helpful, response, question, context, model) VALUES (?, ?, ?, ?, ?)`,
    [helpful, response, question, context, model],
    function (err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Failed to save feedback');
      }

      res.status(200).send('Feedback submitted successfully');
    }
  );
};


