// Import the database connection
import db from '../db/db.js'; 

// Controller function to handle feedback submission
export const feedBack = (req, res) => {
  const { answerId, helpful } = req.body;

  // Validate incoming data
  if (typeof answerId !== 'number' || typeof helpful !== 'boolean') {
    return res.status(400).send('Invalid data');
  }

  // Insert feedback into the database
  db.run('INSERT INTO feedback (answerId, helpful) VALUES (?, ?)', [answerId, helpful], function (err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Failed to save feedback');
    }

    res.status(200).send('Feedback submitted successfully');
  });
};
