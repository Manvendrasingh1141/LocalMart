const express = require('express');
const { protect, authorize } = require('../middleware/auth.middleware');
const {
  getBookmarks,
  toggleBookmark,
  getProfile,
  updateProfile
} = require('../controllers/consumer.controller');

const router = express.Router();

router.use(protect); // Protect all consumer routes

router.get('/bookmarks', authorize('consumer'), getBookmarks);
router.post('/bookmarks/:shopId', authorize('consumer'), toggleBookmark);

router.route('/profile')
  .get(getProfile)
  .put(updateProfile);

module.exports = router;
