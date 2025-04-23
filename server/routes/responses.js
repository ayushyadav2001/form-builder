const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Response = require('../models/Response');

router.post('/:formId', async (req, res) => {
  const { responses } = req.body;
  
  try {
    const response = new Response({
      formId: req.params.formId,
      responses
    });
    await response.save();
    
    // Emit socket event
    const io = req.app.get('socketio');
    io.to(`form:${req.params.formId}`).emit('newResponse', response);
    
    res.json({ msg: 'Response submitted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/:formId', auth, async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.formId });
    res.json(responses);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;