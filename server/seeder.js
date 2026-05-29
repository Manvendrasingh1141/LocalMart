const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User.model');
const Shop = require('./models/Shop.model');
const Product = require('./models/Product.model');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB Connected'))
.catch(err => console.log(err));

const seedDB = async () => {
  try {
    await Shop.deleteMany({});
    
    // Check if we have a vendor
    let vendor = await User.findOne({ role: 'vendor' });
    if (!vendor) {
      vendor = await User.create({
        name: 'Seed Vendor',
        email: 'seedvendor@localmart.com',
        passwordHash: 'password123',
        role: 'vendor',
      });
    }

    const dummyShops = [
      {
        vendorId: vendor._id,
        shopName: 'Fresh Mart Grocery',
        description: 'Your neighborhood fresh grocery store.',
        category: 'Grocery',
        location: {
          type: 'Point',
          coordinates: [-122.4194, 37.7749] // Long, Lat
        },
        address: { city: 'San Francisco' },
        banner: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80',
        businessHours: { isOpen: true },
        rating: { avg: 4.5, count: 120 }
      },
      {
        vendorId: vendor._id,
        shopName: 'Green Pharmacy',
        description: 'Local pharmacy for all your health needs.',
        category: 'Pharmacy',
        location: {
          type: 'Point',
          coordinates: [-122.4294, 37.7849]
        },
        address: { city: 'San Francisco' },
        banner: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&q=80',
        businessHours: { isOpen: true },
        rating: { avg: 4.8, count: 85 }
      },
      {
        vendorId: vendor._id,
        shopName: 'Daily Needs Bakery',
        description: 'Freshly baked breads and cakes daily.',
        category: 'Bakery',
        location: {
          type: 'Point',
          coordinates: [-122.4094, 37.7649]
        },
        address: { city: 'San Francisco' },
        banner: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80',
        businessHours: { isOpen: true },
        rating: { avg: 4.2, count: 45 }
      },
      {
        vendorId: vendor._id,
        shopName: 'Urban Outfitters Local',
        description: 'Trendy clothing right in your area.',
        category: 'Clothing',
        location: {
          type: 'Point',
          coordinates: [-122.4394, 37.7949]
        },
        address: { city: 'San Francisco' },
        banner: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&q=80',
        businessHours: { isOpen: true },
        rating: { avg: 4.6, count: 230 }
      }
    ];

    await Shop.insertMany(dummyShops);
    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding Error: ', error);
    process.exit(1);
  }
};

seedDB();
