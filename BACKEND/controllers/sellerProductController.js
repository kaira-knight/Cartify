import Product from "../models/productModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { uploadImage,deleteImage,deleteMultipleImages } from "../utils/cloudinary.js";


//Craete Product Controller
//POST/api/seller/products
export const createProduct = asyncHandler(async (req, res) => {

   
  const {
    name,
    description,
    price,
    oldPrice,
    category,
    subCategory,
    brand,
    colors,
    sizes,
    variants,
    stock,
    tags,
    specifications,
  } = req.body;

  // ── Validate at least one image ──
  if (!req.files || !req.files.mainImage) {
    throw new ApiError(400, "Main product image is required");
  }

  // ── Upload main image ──
  const mainImageResult = await uploadImage(
    req.files.mainImage[0].path,
    "products/main"
  );

  // ── Upload gallery images (optional) ──
  let galleryImages = [];

  if (req.files.galleryImages && req.files.galleryImages.length > 0) {
    // Limit to 5 gallery images
    if (req.files.galleryImages.length > 5) {
      throw new ApiError(400, "Maximum 5 gallery images allowed");
    }

    const uploadPromises = req.files.galleryImages.map((file) =>
      uploadImage(file.path, "products/gallery")
    );
    galleryImages = await Promise.all(uploadPromises);
  }

  // ── Parse JSON fields if sent as strings (multipart/form-data) ──
  const parseJSON = (field) => {
    if (typeof field === "string") {
      try {
        return JSON.parse(field);
      } catch {
        return field;
      }
    }
    return field;
  };

  // ── Calculate discount ──
  let discount = 0;
  const parsedOldPrice = oldPrice ? Number(oldPrice) : null;
  const parsedPrice = Number(price);

  if (parsedOldPrice && parsedOldPrice > parsedPrice) {
    discount = Math.round(
      ((parsedOldPrice - parsedPrice) / parsedOldPrice) * 100
    );
  }

  // ── Create product ──
  const product = await Product.create({
    name,
    description,
    price: parsedPrice,
    oldPrice: parsedOldPrice,
    discount,
    category,
    subCategory,
    brand,
    image: {
      url: mainImageResult.url,
      public_id: mainImageResult.public_id,
    },
    images: galleryImages,
    colors: parseJSON(colors) || [],
    sizes: parseJSON(sizes) || [],
    variants: parseJSON(variants) || [],
    stock: Number(stock) || 0,
    tags: parseJSON(tags) || [],
    specifications: parseJSON(specifications) || {},
    seller: req.user._id,   // from auth middleware
    isActive: true,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

// 2️->>  GET ALL SELLER'S PRODUCTS
// GET /api/seller/products

export const getSellerProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sort = "-createdAt",
    search,
    category,
    isActive,
  } = req.query;


  // ── Build filter ──
  const filter = { seller: req.user._id };

  if (search) {
    filter.$text = { $search: search };
  }

  if (category) {
    filter.category = category;
  }

  if (isActive !== undefined) {
    filter.isActive = isActive === "true";
  }

  // ── Pagination ──
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  // ── Execute query ──
  const [products, totalCount] = await Promise.all([
    Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Product.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    products,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(totalCount / limitNum),
      totalProducts: totalCount,
      hasNextPage: pageNum * limitNum < totalCount,
      hasPrevPage: pageNum > 1,
    },
  });
});


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3️⃣  GET SINGLE SELLER PRODUCT
// GET /api/seller/products/:id
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const getSellerProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    seller: req.user._id,
  });

  if (!product) {
    throw new ApiError(404, "Product not found or you don't own it");
  }

  res.status(200).json({
    success: true,
    product,
  });
});



// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4️⃣  UPDATE PRODUCT
// PUT /api/seller/products/:id
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const updateProduct = asyncHandler(async (req, res) => {
  // ── Find product owned by seller ──
  const product = await Product.findOne({
    _id: req.params.id,
    seller: req.user._id,
  });

  if (!product) {
    throw new ApiError(404, "Product not found or you don't own it");
  }

  // ── Fields allowed to update ──
  const allowedFields = [
    "name",
    "description",
    "price",
    "oldPrice",
    "category",
    "subCategory",
    "brand",
    "colors",
    "sizes",
    "variants",
    "stock",
    "tags",
    "specifications",
    "isActive",
    "isFeatured",
  ];

  const parseJSON = (field) => {
    if (typeof field === "string") {
      try {
        return JSON.parse(field);
      } catch {
        return field;
      }
    }
    return field;
  };

  // ── Apply updates ──
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      const jsonFields = [
        "colors",
        "sizes",
        "variants",
        "tags",
        "specifications",
      ];

      if (jsonFields.includes(field)) {
        product[field] = parseJSON(req.body[field]);
      } else {
        product[field] = req.body[field];
      }
    }
  });

  // ── Handle main image replacement ──
  if (req.files && req.files.mainImage) {
    // Delete old main image from Cloudinary
    await deleteImage(product.image.public_id);

    // Upload new one
    const newImage = await uploadImage(
      req.files.mainImage[0].path,
      "products/main"
    );

    product.image = {
      url: newImage.url,
      public_id: newImage.public_id,
    };
  }

  // ── Handle gallery image additions ──
  if (req.files && req.files.galleryImages) {
    const totalImages =
      product.images.length + req.files.galleryImages.length;

    if (totalImages > 5) {
      throw new ApiError(
        400,
        `Can only have 5 gallery images. You have ${product.images.length}, trying to add ${req.files.galleryImages.length}`
      );
    }

    const uploadPromises = req.files.galleryImages.map((file) =>
      uploadImage(file.path, "products/gallery")
    );
    const newImages = await Promise.all(uploadPromises);

    product.images.push(...newImages);
  }

  // ── Recalculate discount ──
  if (product.oldPrice && product.oldPrice > product.price) {
    product.discount = Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100
    );
  } else {
    product.discount = 0;
  }

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5️⃣  DELETE PRODUCT
// DELETE /api/seller/products/:id
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    seller: req.user._id,
  });

  if (!product) {
    throw new ApiError(404, "Product not found or you don't own it");
  }

  // ── Delete all images from Cloudinary ──
  const publicIdsToDelete = [];

  // Main image
  if (product.image?.public_id) {
    publicIdsToDelete.push(product.image.public_id);
  }

  // Gallery images
  product.images.forEach((img) => {
    if (img.public_id) {
      publicIdsToDelete.push(img.public_id);
    }
  });

  if (publicIdsToDelete.length > 0) {
    await deleteMultipleImages(publicIdsToDelete);
  }

  await Product.findByIdAndDelete(product._id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6️⃣  DELETE A SPECIFIC GALLERY IMAGE
// DELETE /api/seller/products/:id/images/:imageId
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const deleteGalleryImage = asyncHandler(async (req, res) => {
  const { id, imageId } = req.params;

  const product = await Product.findOne({
    _id: id,
    seller: req.user._id,
  });

  if (!product) {
    throw new ApiError(404, "Product not found or you don't own it");
  }

  // ── Find the image in gallery ──
  const imageIndex = product.images.findIndex(
    (img) => img._id.toString() === imageId
  );

  if (imageIndex === -1) {
    throw new ApiError(404, "Gallery image not found");
  }

  // ── Delete from Cloudinary ──
  await deleteImage(product.images[imageIndex].public_id);

  // ── Remove from array ──
  product.images.splice(imageIndex, 1);
  await product.save();

  res.status(200).json({
    success: true,
    message: "Gallery image deleted successfully",
    remainingImages: product.images,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7️⃣  UPDATE STOCK / VARIANT STOCK
// PATCH /api/seller/products/:id/stock
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const updateStock = asyncHandler(async (req, res) => {
  const { stock, variantId, variantStock } = req.body;

  const product = await Product.findOne({
    _id: req.params.id,
    seller: req.user._id,
  });

  if (!product) {
    throw new ApiError(404, "Product not found or you don't own it");
  }

  // ── Update specific variant stock ──
  if (variantId) {
    const variant = product.variants.id(variantId);

    if (!variant) {
      throw new ApiError(404, "Variant not found");
    }

    if (variantStock === undefined || variantStock < 0){
      throw new ApiError(400, "Valid variant stock value is required");
    }

    variant.stock = Number(variantStock);
  }
  // ── Update main product stock ──
  else {
    if (stock === undefined || stock < 0) {
      throw new ApiError(400, "Valid stock value is required");
    }

    product.stock = Number(stock);
  }

  await product.save();

  res.status(200).json({
    success: true,
    message: "Stock updated successfully",
    product: {
      _id: product._id,
      name: product.name,
      stock: product.stock,
      variants: product.variants,
    },
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8️⃣  TOGGLE PRODUCT ACTIVE STATUS
// PATCH /api/seller/products/:id/toggle-active
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const toggleProductActive = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    seller: req.user._id,
  });

  if (!product) {
    throw new ApiError(404, "Product not found or you don't own it");
  }

  product.isActive = !product.isActive;
  await product.save();

  res.status(200).json({
    success: true,
    message: `Product ${product.isActive ? "activated" : "deactivated"}`,
    isActive: product.isActive,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9️⃣  SELLER DASHBOARD STATS
// GET /api/seller/products/stats
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const getSellerStats = asyncHandler(async (req, res) => {
  const sellerId = req.user._id;

  const stats = await Product.aggregate([
    { $match: { seller: sellerId } },
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        activeProducts: {
          $sum: { $cond: ["$isActive", 1, 0] },
        },
        inactiveProducts: {
          $sum: { $cond: ["$isActive", 0, 1] },
        },
        outOfStock: {
          $sum: { $cond: [{ $lte: ["$stock", 0] }, 1, 0] },
        },
        averagePrice: { $avg: "$price" },
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: "$numReviews" },
      },
    },
  ]);

  // ── Category breakdown ──
  const categoryStats = await Product.aggregate([
    { $match: { seller: sellerId } },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
        avgPrice: { $avg: "$price" },
      },
    },
    { $sort: { count: -1 } },
  ]);

  res.status(200).json({
    success: true,
    stats: stats[0] || {
      totalProducts: 0,
      activeProducts: 0,
      inactiveProducts: 0,
      outOfStock: 0,
      averagePrice: 0,
      averageRating: 0,
      totalReviews: 0,
    },
    categoryStats,
  });
});