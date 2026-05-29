const express = require('express');
const { protect, authorize } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const multer = require('multer');

// Configure local multer for CSV
const uploadCSV = multer({ dest: 'uploads/' });

const {
  addProduct,
  searchProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  bulkUpload
} = require('../controllers/product.controller');

const router = express.Router();

router.route('/')
  .post(protect, authorize('vendor'), upload.fields([{ name: 'images', maxCount: 4 }]), addProduct);

router.get('/search', searchProducts);

router.post('/bulk-upload', protect, authorize('vendor'), uploadCSV.single('file'), bulkUpload);

router.route('/:id')
  .get(getProduct)
  .put(protect, authorize('vendor'), upload.fields([{ name: 'images', maxCount: 4 }]), updateProduct)
  .delete(protect, authorize('vendor', 'admin'), deleteProduct);

module.exports = router;
