const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Form = require('../models/Form');
const { v4: uuidv4 } = require('uuid');

router.post('/', auth, async (req, res) => {
  const { title, fields } = req.body;
  
  try {
    const form = new Form({
      title,
      fields,
      userId: req.user.id
    });
    await form.save();
    res.json(form);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const forms = await Form.find({ userId: req.user.id });
    res.json(forms);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ msg: 'Form not found' });
    res.json(form);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;