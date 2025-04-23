const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  fields: [{
    type: {
      type: String,
      enum: ['text', 'dropdown', 'radio', 'textarea'],
      required: true
    },
    label: String,
    placeholder: String,
    required: Boolean,
    options: [String]
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Form', formSchema);