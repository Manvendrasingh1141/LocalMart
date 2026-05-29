const Shop = require('../models/Shop.model');
const Product = require('../models/Product.model');

// @desc    Get vendor dashboard stats
// @route   GET /api/vendor/dashboard
// @access  Private/Vendor
exports.getDashboardStats = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({ vendorId: req.user.id });
    
    if (!shop) {
      return res.status(404).json({ success: false, error: 'Shop not found' });
    }

    // In a real app, you'd track views, clicks, etc. in a separate collection.
    // For now, returning mock data mixed with real stats.
    const stats = {
      totalProducts: shop.totalProducts,
      profileViews: Math.floor(Math.random() * 500), 
      timesBookmarked: Math.floor(Math.random() * 50),
      customerEnquiries: Math.floor(Math.random() * 20),
    };

    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
};

// @desc    Get vendor's shop
// @route   GET /api/vendor/shop
// @access  Private/Vendor
exports.getVendorShop = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({ vendorId: req.user.id });
    
    if (!shop) {
      return res.status(404).json({ success: false, error: 'Shop not found' });
    }

    res.status(200).json({ success: true, data: shop });
  } catch (err) {
    next(err);
  }
};

// @desc    Get vendor's products
// @route   GET /api/vendor/products
// @access  Private/Vendor
exports.getVendorProducts = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({ vendorId: req.user.id });
    
    if (!shop) {
      return res.status(404).json({ success: false, error: 'Shop not found' });
    }

    // Add pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const products = await Product.find({ shopId: shop._id })
      .skip(startIndex)
      .limit(limit);

    const total = await Product.countDocuments({ shopId: shop._id });

    res.status(200).json({ 
      success: true, 
      count: products.length, 
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: products 
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Bulk update products (e.g. stock)
// @route   PUT /api/vendor/products/bulk
// @access  Private/Vendor
exports.bulkUpdateProducts = async (req, res, next) => {
  try {
    const { updates } = req.body; // Array of { id, quantity, price }
    
    if (!updates || !Array.isArray(updates)) {
      return res.status(400).json({ success: false, error: 'Please provide an array of updates' });
    }

    const shop = await Shop.findOne({ vendorId: req.user.id });
    if (!shop) {
       return res.status(404).json({ success: false, error: 'Shop not found' });
    }

    const io = require('../server').io;

    for (const update of updates) {
      const product = await Product.findById(update.id);
      if (product && product.shopId.toString() === shop._id.toString()) {
        product.quantity = update.quantity !== undefined ? update.quantity : product.quantity;
        product.price = update.price !== undefined ? update.price : product.price;
        product.inStock = product.quantity > 0;
        product.lastUpdated = Date.now();
        await product.save();

        if(req.app && req.app.get('io')) {
          req.app.get('io').to(shop._id.toString()).emit('stock:updated', { productId: product._id, quantity: product.quantity, inStock: product.inStock });
        }
      }
    }

    res.status(200).json({ success: true, message: 'Products updated successfully' });
  } catch (err) {
    next(err);
  }
};
