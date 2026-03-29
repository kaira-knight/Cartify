import Product from "../models/productModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1️⃣  GET ALL PRODUCTS (with filters, sort, pagination)
// GET /api/products
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const getAllProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    sort = "-createdAt",
    search,
    category,
    brand,
    minPrice,
    maxPrice,
    minRating,
    color,
    size,
    tags,
  } = req.query;

  // ── Build filter ──
  const filter = { isActive: true };

  // Text search
  if (search) {
    filter.$text = { $search: search };
  }

  // Category
  if (category) {
    filter.category = category;
  }

  // Brand (case-insensitive)
  if (brand) {
    filter.brand = { $regex: new RegExp(`^${brand}$`, "i") };
  }

  // Price range
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  // Minimum rating
  if (minRating) {
    filter.rating = { $gte: Number(minRating) };
  }

  // Filter by available color
  if (color) {
    filter["colors.name"] = { $regex: new RegExp(color, "i") };
  }

  // Filter by available size
  if (size) {
    filter.sizes = size;
  }

  // Filter by tags
  if (tags) {
    const tagArray = tags.split(",").map((t) => t.trim());
    filter.tags = { $in: tagArray };
  }

  // ── Sort options ──
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "price-low": "price",
    "price-high": "-price",
    "rating-high": "-rating",
    "most-reviewed": "-numReviews",
    name: "name",
  };
  const sortBy = sortOptions[sort] || sort;

  // ── Pagination ──
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  // ── Execute ──
  const [products, totalCount] = await Promise.all([
    Product.find(filter)
      .select("-reviews")           // don't send all reviews in listing
      .populate("seller", "name")   // only seller name
      .sort(sortBy)
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
// 2️⃣  GET SINGLE PRODUCT
// GET /api/products/:id
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    isActive: true,
  }).populate("seller", "name");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3️⃣  GET FEATURED PRODUCTS
// GET /api/products/featured
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const limit = Math.min(20, parseInt(req.query.limit) || 8);

  const products = await Product.find({
    isFeatured: true,
    isActive: true,
  })
    .select("-reviews")
    .sort("-rating")
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    products,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4️⃣  GET PRODUCTS BY CATEGORY
// GET /api/products/category/:category
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 12, sort = "-createdAt" } = req.query;

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  const filter = {
    category,
    isActive: true,
  };

  const [products, totalCount] = await Promise.all([
    Product.find(filter)
      .select("-reviews")
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Product.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    category,
    products,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(totalCount / limitNum),
      totalProducts: totalCount,
    },
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5️⃣  GET RELATED PRODUCTS
// GET /api/products/:id/related
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const getRelatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).select(
    "category brand tags"
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const limit = Math.min(10, parseInt(req.query.limit) || 4);

  const relatedProducts = await Product.find({
    _id: { $ne: product._id },            // exclude current product
    isActive: true,
    $or: [
      { category: product.category },
      { brand: product.brand },
      { tags: { $in: product.tags || [] } },
    ],
  })
    .select("-reviews")
    .sort("-rating")
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    products: relatedProducts,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6️⃣  ADD / UPDATE REVIEW
// POST /api/products/:id/reviews
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  // ── Validate input ──
  if (!rating || !comment) {
    throw new ApiError(400, "Rating and comment are required");
  }

  if (rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be between 1 and 5");
  }

  const product = await Product.findOne({
    _id: req.params.id,
    isActive: true,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // ── Prevent seller from reviewing own product ──
  if (product.seller.toString() === req.user._id.toString()) {
    throw new ApiError(403, "You cannot review your own product");
  }

  // ── Check if user already reviewed ──
  const existingReviewIndex = product.reviews.findIndex(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (existingReviewIndex !== -1) {
    // ── Update existing review ──
    product.reviews[existingReviewIndex].rating = Number(rating);
    product.reviews[existingReviewIndex].comment = comment;
    product.reviews[existingReviewIndex].name = req.user.name;
  } else {
    // ── Add new review ──
    const newReview = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    product.reviews.push(newReview);
  }

  // ── Recalculate rating ──
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((sum, r) => sum + r.rating, 0) /
    product.reviews.length;

  // Round to 1 decimal
  product.rating = Math.round(product.rating * 10) / 10;

  await product.save();

  res.status(existingReviewIndex !== -1 ? 200 : 201).json({
    success: true,
    message:
      existingReviewIndex !== -1
        ? "Review updated successfully"
        : "Review added successfully",
    rating: product.rating,
    numReviews: product.numReviews,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7️⃣  DELETE OWN REVIEW
// DELETE /api/products/:id/reviews
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const deleteReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // ── Find user's review ──
  const reviewIndex = product.reviews.findIndex(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (reviewIndex === -1) {
    throw new ApiError(404, "You haven't reviewed this product");
  }

  // ── Remove review ──
  product.reviews.splice(reviewIndex, 1);

  // ── Recalculate rating ──
  if (product.reviews.length === 0) {
    product.rating = 0;
    product.numReviews = 0;
  } else {
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((sum, r) => sum + r.rating, 0) /
      product.reviews.length;
    product.rating = Math.round(product.rating * 10) / 10;
  }

  await product.save();

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
    rating: product.rating,
    numReviews: product.numReviews,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8️⃣  GET PRODUCT REVIEWS (paginated)
// GET /api/products/:id/reviews
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const getProductReviews = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sort = "-createdAt" } = req.query;

  const product = await Product.findOne({
    _id: req.params.id,
    isActive: true,
  }).select("reviews rating numReviews name");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // ── Manual pagination on embedded array ──
  let reviews = [...product.reviews];

  // Sort
  if (sort === "-createdAt") {
    reviews.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sort === "createdAt") {
    reviews.sort((a, b) => a.createdAt - b.createdAt);
  } else if (sort === "-rating") {
    reviews.sort((a, b) => b.rating - a.rating);
  } else if (sort === "rating") {
    reviews.sort((a, b) => a.rating - b.rating);
  }

  const totalReviews = reviews.length;
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  reviews = reviews.slice(skip, skip + limitNum);

  // ── Rating breakdown ──
  const ratingBreakdown = {
    5: product.reviews.filter((r) => r.rating === 5).length,
    4: product.reviews.filter((r) => r.rating === 4).length,
    3: product.reviews.filter((r) => r.rating === 3).length,
    2: product.reviews.filter((r) => r.rating === 2).length,
    1: product.reviews.filter((r) => r.rating === 1).length,
  };

  res.status(200).json({
    success: true,
    rating: product.rating,
    numReviews: product.numReviews,
    ratingBreakdown,
    reviews,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(totalReviews / limitNum),
      totalReviews,
    },
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9️⃣  GET AVAILABLE FILTERS (for filter sidebar)
// GET /api/products/filters
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const getAvailableFilters = asyncHandler(async (req, res) => {
  const { category } = req.query;

  const matchStage = { isActive: true };
  if (category) matchStage.category = category;

  const [filters] = await Product.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        categories: { $addToSet: "$category" },
        brands: { $addToSet: "$brand" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
        allSizes: { $push: "$sizes" },
        allColors: { $push: "$colors.name" },
      },
    },
    {
      $project: {
        _id: 0,
        categories: 1,
        brands: {
          $filter: {
            input: "$brands",
            cond: { $ne: ["$$this", null] },
          },
        },
        priceRange: {
          min: "$minPrice",
          max: "$maxPrice",
        },
        sizes: {
          $reduce: {
            input: "$allSizes",
            initialValue: [],
            in: { $setUnion: ["$$value", "$$this"] },
          },
        },
        colors: {
          $reduce: {
            input: "$allColors",
            initialValue: [],
            in: { $setUnion: ["$$value", "$$this"] },
          },
        },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    filters: filters || {
      categories: [],
      brands: [],
      priceRange: { min: 0, max: 0 },
      sizes: [],
      colors: [],
    },
  });
});