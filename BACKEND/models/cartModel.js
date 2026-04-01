import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    color: {
      type: String,
      default: null,
    },

    size: {
      type: String,
      default: null,
    },

    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    sku: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [cartItemSchema],

    totalItems: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },

    totalDiscount: {
      type: Number,
      default: 0,
    },

    finalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ✅ FIXED — removed next parameter
cartSchema.pre("save", function () {
  this.totalItems = this.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  this.totalPrice = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  this.totalPrice = Math.round(this.totalPrice * 100) / 100;

  this.finalPrice = Math.round(
    (this.totalPrice - this.totalDiscount) * 100
  ) / 100;

  if (this.finalPrice < 0) this.finalPrice = 0;
});



const Cart = mongoose.model("Cart", cartSchema);
export default Cart;