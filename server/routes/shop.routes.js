const express = require('express');
const { protect, authorize } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const {
  createShop,
  getNearbyShops,
  searchShops,
  getShop,
  updateShop,
  deleteShop,
  getShopProducts,
  getShopReviews,
  addReview
} = require('../controllers/shop.controller');

const router = express.Router();

router.route('/')
  .post(
    protect, 
    authorize('vendor'), 
    upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), 
    createShop
  );

router.get('/nearby', getNearbyShops);
router.get('/search', searchShops);

router.route('/:id')
  .get(getShop)
  .put(
    protect, 
    authorize('vendor', 'admin'), 
    upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), 
    updateShop
  )
  .delete(protect, authorize('vendor', 'admin'), deleteShop);

router.get('/:id/products', getShopProducts);
router.get('/:id/reviews', getShopReviews);
router.post('/:id/reviews', protect, authorize('consumer'), addReview);

module.exports = router;
