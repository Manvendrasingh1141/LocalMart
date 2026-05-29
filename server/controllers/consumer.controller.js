const User = require('../models/User.model');
const Shop = require('../models/Shop.model');

// @desc    Get bookmarked shops
// @route   GET /api/consumer/bookmarks
// @access  Private/Consumer
exports.getBookmarks = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'bookmarkedShops',
      select: 'shopName category location rating totalProducts',
    });

    res.status(200).json({ success: true, count: user.bookmarkedShops.length, data: user.bookmarkedShops });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle bookmark for a shop
// @route   POST /api/consumer/bookmarks/:shopId
// @access  Private/Consumer
exports.toggleBookmark = async (req, res, next) => {
  try {
    const shopId = req.params.shopId;
    const user = await User.findById(req.user.id);

    // Check if shop exists
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ success: false, error: 'Shop not found' });
    }

    const isBookmarked = user.bookmarkedShops.includes(shopId);

    if (isBookmarked) {
      // Remove bookmark
      user.bookmarkedShops = user.bookmarkedShops.filter(id => id.toString() !== shopId);
    } else {
      // Add bookmark
      user.bookmarkedShops.push(shopId);
    }

    await user.save();

    res.status(200).json({ success: true, isBookmarked: !isBookmarked, data: user.bookmarkedShops });
  } catch (err) {
    next(err);
  }
};

// @desc    Get profile
// @route   GET /api/consumer/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// @desc    Update profile
// @route   PUT /api/consumer/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phone, location } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, location },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
