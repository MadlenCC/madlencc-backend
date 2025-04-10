// src/models/Content.js
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String },
  age: { type: [String] },
  patreonLink: { type: String }
}, { timestamps: true });

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
