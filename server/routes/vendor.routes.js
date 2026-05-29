const express = require('express');
const { protect, authorize } = require('../middleware/auth.middleware');
const {
  getDashboardStats,
  getVendorShop,
  getVendorProducts,
  bulkUpdateProducts
} = require('../controllers/vendor.controller');

const router = express.Router();

router.use(protect);
router.use(authorize('vendor'));

router.get('/dashboard', getDashboardStats);
router.get('/shop', getVendorShop);
router.get('/products', getVendorProducts);
router.put('/products/bulk', bulkUpdateProducts);

module.exports = router;
