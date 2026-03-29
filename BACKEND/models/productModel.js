import mongoose from "mongoose";

// ✅ Review Schema (embedded)
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);



// ✅ Variant Schema (for size/color combinations)
const variantSchema = new mongoose.Schema({
  color: {
    type: String,
    trim: true,
  },
  size: {
    type: String,
    trim: true,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  price: {
    type: Number,  // Optional: different price per variant
  },
  sku: {
    type: String,  // Stock Keeping Unit
  },
});




// ✅ Main Product Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },

    oldPrice: {
      type: Number,
      default: null,
    },

    discount: {
      type: Number,  // Percentage (e.g., 40 for 40%)
      default: 0,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Electronics",
        "Fashion",
        "Home & Garden",
        "Sports",
        "Beauty",
        "Books",
        "Toys",
        "Automotive",
        "Health",
        "Grocery",
        "Other",
      ],
    },

    subCategory: {
      type: String,
      trim: true,
    },

    brand: {
      type: String,
      trim: true,
    },

  image: {
  url:       { type: String, required: [true, "Product image URL is required"] },
  public_id: { type: String, required: [true, "Product image public_id is required"] },
},

    // ✅ Colors available
    colors: [
      {
        name: String,      // "Red", "Blue"
        hexCode: String,   // "#FF0000"
      },
    ],

    // ✅ Sizes available
    sizes: [String],  // ["S", "M", "L", "XL"]

    // ✅ Variants (color + size combinations with stock)
    variants: [variantSchema],

    // ✅ Total stock (if no variants)
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ✅ Ratings
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    reviews: [reviewSchema],

    // ✅ Seller
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ✅ Flags
    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    // ✅ Tags for search
    tags: [String],

    // ✅ Specifications
    specifications: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

// ✅ Fix — add a pre-hook for updates as well
productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  const price    = update.price    ?? update.$set?.price;
  const oldPrice = update.oldPrice ?? update.$set?.oldPrice;

  if (oldPrice && price && oldPrice > price) {
    this.set({
      discount: Math.round(((oldPrice - price) / oldPrice) * 100),
    });
  }
  next();
});
// ✅ Indexes for faster queries
productSchema.index({ name: "text", description: "text", tags: "text" });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ isFeatured: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;