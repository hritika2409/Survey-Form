const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/submit', (req, res) => {
  const {
    name,
    email,
    age,
    gender,
    satisfaction,
    feedback,
    improvement,
    recommend,
    futureContact
  } = req.body;

  const sql = `INSERT INTO responses 
    (name, email, age, gender, satisfaction, feedback, improvement, recommend, futureContact)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    name,
    email,
    age,
    gender,
    satisfaction,
    feedback,
    improvement,
    recommend,
    futureContact || "No"
  ], (err, result) => {
    if (err) {
      console.error('❌ Error inserting data:', err);
      res.send('There was an error saving your response.');
    } else {
      console.log('✅ Response saved:', result.insertId);
      res.send('<h2>Thank you for submitting the survey!</h2>');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
