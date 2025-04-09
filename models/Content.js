import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  age: { type: [String] },
  patreonLink: { type: String }
}, { timestamps: true });

const Content = mongoose.model('Content', contentSchema);

export default Content;
