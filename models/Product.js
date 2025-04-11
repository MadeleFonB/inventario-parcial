const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, default: 0 },
  minStock: { type: Number, default: 1 }
});

module.exports = mongoose.model('Product', productSchema);
