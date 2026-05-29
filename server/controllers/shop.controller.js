const Shop = require('../models/Shop.model');
const Product = require('../models/Product.model');
const Review = require('../models/Review.model');

// @desc    Create shop (vendor)
// @route   POST /api/shops
// @access  Private/Vendor
exports.createShop = async (req, res, next) => {
  try {
    const { shopName, description, category, subCategories, address, lat, lng, businessHours } = req.body;
    
    // Check if vendor already has a shop
    const existingShop = await Shop.findOne({ vendorId: req.user.id });
    if (existingShop) {
      return res.status(400).json({ success: false, error: 'Vendor already has a shop' });
    }

    const shop = await Shop.create({
      vendorId: req.user.id,
      shopName,
      description,
      category,
      subCategories: subCategories ? JSON.parse(subCategories) : [],
      address: address ? JSON.parse(address) : {},
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)], // GeoJSON format is [lng, lat]
      },
      businessHours: businessHours ? JSON.parse(businessHours) : {},
      logo: req.files?.logo ? req.files.logo[0].path : undefined,
      banner: req.files?.banner ? req.files.banner[0].path : undefined,
    });

    res.status(201).json({ success: true, data: shop });
  } catch (err) {
    next(err);
  }
};

// @desc    Get nearby shops
// @route   GET /api/shops/nearby
// @access  Public
exports.getNearbyShops = async (req, res, next) => {
  try {
    const { lat, lng, radius = 5, category } = req.query; // radius in km

    if (!lat || !lng) {
      return res.status(400).json({ success: false, error: 'Please provide latitude and longitude' });
    }

    const query = {
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseFloat(radius) * 1000, // convert km to meters
        },
      },
      isActive: true,
      isVerified: true,
    };

    if (category && category !== 'All') {
      query.category = category;
    }

    const shops = await Shop.find(query).populate('vendorId', 'name email');

    res.status(200).json({ success: true, count: shops.length, data: shops });
  } catch (err) {
    next(err);
  }
};

// @desc    Search shops
// @route   GET /api/shops/search
// @access  Public
exports.searchShops = async (req, res, next) => {
  try {
    const { q, category, city } = req.query;
    
    let query = { isActive: true, isVerified: true };

    if (q) {
      query.shopName = { $regex: q, $options: 'i' };
    }
    if (category && category !== 'All') {
      query.category = category;
    }
    if (city) {
      query['address.city'] = { $regex: city, $options: 'i' };
    }

    const shops = await Shop.find(query);

    res.status(200).json({ success: true, count: shops.length, data: shops });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single shop
// @route   GET /api/shops/:id
// @access  Public
exports.getShop = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id).populate('vendorId', 'name email');

    if (!shop) {
      return res.status(404).json({ success: false, error: 'Shop not found' });
    }

    res.status(200).json({ success: true, data: shop });
  } catch (err) {
    next(err);
  }
};

// @desc    Update shop
// @route   PUT /api/shops/:id
// @access  Private/Vendor
exports.updateShop = async (req, res, next) => {
  try {
    let shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({ success: false, error: 'Shop not found' });
    }

    // Make sure user is shop owner or admin
    if (shop.vendorId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Not authorized to update this shop' });
    }

    const updateData = { ...req.body };
    if (updateData.lat && updateData.lng) {
      updateData.location = {
        type: 'Point',
        coordinates: [parseFloat(updateData.lng), parseFloat(updateData.lat)],
      };
    }
    
    if (updateData.subCategories) updateData.subCategories = JSON.parse(updateData.subCategories);
    if (updateData.address) updateData.address = JSON.parse(updateData.address);
    if (updateData.businessHours) updateData.businessHours = JSON.parse(updateData.businessHours);
    
    if (req.files?.logo) updateData.logo = req.files.logo[0].path;
    if (req.files?.banner) updateData.banner = req.files.banner[0].path;

    shop = await Shop.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: shop });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete shop
// @route   DELETE /api/shops/:id
// @access  Private/Vendor/Admin
exports.deleteShop = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({ success: false, error: 'Shop not found' });
    }

    if (shop.vendorId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Not authorized to delete this shop' });
    }

    await Shop.deleteOne({ _id: req.params.id });

    // Also delete associated products and reviews
    await Product.deleteMany({ shopId: req.params.id });
    await Review.deleteMany({ shopId: req.params.id });

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// @desc    Get products in shop
// @route   GET /api/shops/:id/products
// @access  Public
exports.getShopProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ shopId: req.params.id });
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (err) {
    next(err);
  }
};

// @desc    Get shop reviews
// @route   GET /api/shops/:id/reviews
// @access  Public
exports.getShopReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ shopId: req.params.id }).populate('userId', 'name avatar');
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    next(err);
  }
};

// @desc    Add review
// @route   POST /api/shops/:id/reviews
// @access  Private/Consumer
exports.addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const shopId = req.params.id;
    const userId = req.user.id;

    // Check if shop exists
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ success: false, error: 'Shop not found' });
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({ shopId, userId });
    if (existingReview) {
      return res.status(400).json({ success: false, error: 'You have already reviewed this shop' });
    }

    const review = await Review.create({
      shopId,
      userId,
      rating,
      comment,
    });

    // Update shop average rating
    const reviews = await Review.find({ shopId });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    
    shop.rating.avg = avgRating;
    shop.rating.count = reviews.length;
    await shop.save();

    res.status(201).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};
