const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    required: true,
  },
  subCategories: [String],
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    }
  },
  logo: String,
  banner: String,
  businessHours: {
    open: String,
    close: String,
    days: [String],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  rating: {
    avg: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  totalProducts: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

// Create a 2dsphere index on the location field for geospatial queries
shopSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Shop', shopSchema);
