const Product = require('../models/Product.model');
const Shop = require('../models/Shop.model');
const { parseCSV } = require('../utils/csvParser');
const fs = require('fs');

// @desc    Add product
// @route   POST /api/products
// @access  Private/Vendor
exports.addProduct = async (req, res, next) => {
  try {
    req.body.shopId = req.user.shopId; // Assuming shopId is attached to user or we find it
    
    // Find the shop for the logged in vendor
    const shop = await Shop.findOne({ vendorId: req.user.id });
    if (!shop) {
      return res.status(404).json({ success: false, error: 'Shop not found. Create a shop first.' });
    }
    
    const productData = { ...req.body, shopId: shop._id };
    
    if (req.files && req.files.images) {
      productData.images = req.files.images.map(file => file.path);
    }
    if (productData.tags) {
        productData.tags = JSON.parse(productData.tags);
    }

    const product = await Product.create(productData);

    // Update shop totalProducts
    shop.totalProducts += 1;
    await shop.save();

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
exports.searchProducts = async (req, res, next) => {
  try {
    const { q, category, shopId } = req.query;
    let query = {};

    if (q) {
      query.name = { $regex: q, $options: 'i' };
    }
    if (category && category !== 'All') {
      query.category = category;
    }
    if (shopId) {
      query.shopId = shopId;
    }

    const products = await Product.find(query).populate('shopId', 'shopName location');

    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('shopId', 'shopName location');
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Vendor
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const shop = await Shop.findById(product.shopId);
    if (shop.vendorId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to update this product' });
    }

    const updateData = { ...req.body, lastUpdated: Date.now() };
    
    if (req.files && req.files.images) {
      updateData.images = req.files.images.map(file => file.path);
    }
    if (updateData.tags) {
        updateData.tags = JSON.parse(updateData.tags);
    }

    product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    // Emit socket event for real-time stock update
    const io = require('../server').io; // Assuming io is exported or accessible globally. A better way is using req.app.get('io') but we didn't set it. Let's not crash if io isn't available
    if(req.app && req.app.get('io')) {
       req.app.get('io').to(product.shopId.toString()).emit('stock:updated', { productId: product._id, quantity: product.quantity, inStock: product.inStock });
    }

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Vendor
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const shop = await Shop.findById(product.shopId);
    if (shop.vendorId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Not authorized to delete this product' });
    }

    await Product.deleteOne({ _id: req.params.id });

    // Update shop totalProducts
    shop.totalProducts -= 1;
    await shop.save();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// @desc    Bulk upload CSV
// @route   POST /api/products/bulk-upload
// @access  Private/Vendor
exports.bulkUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a CSV file' });
    }

    const shop = await Shop.findOne({ vendorId: req.user.id });
    if (!shop) {
      // Remove temp file
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ success: false, error: 'Shop not found' });
    }

    const records = await parseCSV(req.file.path);
    const productsToInsert = [];
    const errors = [];

    records.forEach((row, index) => {
      try {
        productsToInsert.push({
          shopId: shop._id,
          name: row.name,
          description: row.description,
          category: row.category,
          price: Number(row.price),
          mrp: Number(row.mrp),
          unit: row.unit,
          quantity: Number(row.quantity),
          inStock: Number(row.quantity) > 0,
        });
      } catch (err) {
        errors.push(`Row ${index + 1}: Data validation failed`);
      }
    });

    let insertedCount = 0;
    if (productsToInsert.length > 0) {
      const result = await Product.insertMany(productsToInsert);
      insertedCount = result.length;
      shop.totalProducts += insertedCount;
      await shop.save();
    }

    // Remove temp file
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      message: `Uploaded ${insertedCount} products. ${errors.length} errors.`,
      errors,
    });
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    next(err);
  }
};
