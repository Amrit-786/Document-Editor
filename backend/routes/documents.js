const express = require('express');
const Document = require('../models/Document');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();


router.get('/', verifyToken, async (req, res) => {
  try {
    const documents = await Document.find({ owner: req.user.id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/', verifyToken, async (req, res) => {
  const { title } = req.body;
  try {
    const document = await Document.create({ title, owner: req.user.id });
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
