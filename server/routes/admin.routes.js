const express = require('express');
const { protect, authorize } = require('../middleware/auth.middleware');
const {
  getVendors,
  verifyVendor,
  getPlatformStats,
  deleteUser
} = require('../controllers/admin.controller');
const { deleteShop } = require('../controllers/shop.controller');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/vendors', getVendors);
router.put('/vendors/:id/verify', verifyVendor);
router.get('/stats', getPlatformStats);
router.delete('/users/:id', deleteUser);
router.delete('/shops/:id', deleteShop); // Using deleteShop from shop.controller

module.exports = router;
