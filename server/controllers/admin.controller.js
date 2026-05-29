const User = require('../models/User.model');
const Shop = require('../models/Shop.model');
const Product = require('../models/Product.model');

// @desc    Get all vendors (applications)
// @route   GET /api/admin/vendors
// @access  Private/Admin
exports.getVendors = async (req, res, next) => {
  try {
    const vendors = await User.find({ role: 'vendor' });
    res.status(200).json({ success: true, count: vendors.length, data: vendors });
  } catch (err) {
    next(err);
  }
};

// @desc    Approve/Reject vendor shop
// @route   PUT /api/admin/vendors/:id/verify
// @access  Private/Admin
exports.verifyVendor = async (req, res, next) => {
  try {
    const { isVerified } = req.body;
    
    // Verify the shop associated with the vendor
    const shop = await Shop.findOneAndUpdate(
      { vendorId: req.params.id },
      { isVerified },
      { new: true }
    );

    if (!shop) {
      return res.status(404).json({ success: false, error: 'Shop not found for this vendor' });
    }

    // Also update user's verification status
    await User.findByIdAndUpdate(req.params.id, { isVerified });

    res.status(200).json({ success: true, data: shop });
  } catch (err) {
    next(err);
  }
};

// @desc    Get platform stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getPlatformStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalShops = await Shop.countDocuments();
    const activeShops = await Shop.countDocuments({ isActive: true, isVerified: true });
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalShops,
        activeShops,
        totalProducts,
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Remove user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    await User.deleteOne({ _id: req.params.id });

    // If user is a vendor, delete their shop and products
    if (user.role === 'vendor') {
      const shop = await Shop.findOne({ vendorId: req.params.id });
      if (shop) {
        await Product.deleteMany({ shopId: shop._id });
        await Shop.deleteOne({ _id: shop._id });
      }
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
