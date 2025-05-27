const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Please fill all fields' });
  }

  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ msg: 'Database error' });
    }
    res.status(200).json({ msg: 'Message sent!' });
  });
});

module.exports = router;
