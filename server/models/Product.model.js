const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    required: true,
  },
  subCategory: String,
  price: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  unit: {
    type: String, // kg, litre, piece, set, etc.
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  images: [String],
  tags: [String],
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
