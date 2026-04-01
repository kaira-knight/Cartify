import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1️⃣  GET CART
// GET /api/cart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate({
    path: "items.product",
    select: "name price oldPrice image stock variants isActive",
  });

  // ── If no cart exists create empty one ──
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    });
  }

  res.status(200).json({
    success: true,
    cart,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2️⃣  ADD TO CART
// POST /api/cart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1, color, size, variantId } = req.body;

  // ── Validate input ──
  if (!productId) {
    throw new ApiError(400, "Product ID is required");
  }

  if (quantity < 1) {
    throw new ApiError(400, "Quantity must be at least 1");
  }

  // ── Find product ──
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (!product.isActive) {
    throw new ApiError(400, "Product is currently unavailable");
  }

  // ── Check stock ──
  let availableStock = product.stock;
  let itemPrice = product.price;
  let itemSku = null;

  // If variant is specified
  if (variantId) {
    const variant = product.variants.id(variantId);

    if (!variant) {
      throw new ApiError(404, "Product variant not found");
    }

    availableStock = variant.stock;
    itemPrice = variant.price || product.price;
    itemSku = variant.sku;
  } else if (product.variants.length > 0 && (color || size)) {
    // Find variant by color and size
    const variant = product.variants.find((v) => {
      const colorMatch = color
        ? v.color?.toLowerCase() === color.toLowerCase()
        : true;
      const sizeMatch = size
        ? v.size?.toLowerCase() === size.toLowerCase()
        : true;
      return colorMatch && sizeMatch;
    });

    if (variant) {
      availableStock = variant.stock;
      itemPrice = variant.price || product.price;
      itemSku = variant.sku;
    }
  }

  if (availableStock < quantity) {
    throw new ApiError(
      400,
      `Only ${availableStock} items available in stock`
    );
  }

  // ── Find or create cart ──
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: [],
    });
  }

  // ── Check if item already exists in cart ──
  const existingItemIndex = cart.items.findIndex((item) => {
    const productMatch =
      item.product.toString() === productId.toString();
    const colorMatch = item.color === (color || null);
    const sizeMatch = item.size === (size || null);
    const variantMatch = variantId
      ? item.variantId?.toString() === variantId.toString()
      : !item.variantId;

    return productMatch && colorMatch && sizeMatch && variantMatch;
  });

  if (existingItemIndex > -1) {
    // ── Update quantity of existing item ──
    const newQuantity =
      cart.items[existingItemIndex].quantity + quantity;

    if (newQuantity > availableStock) {
      throw new ApiError(
        400,
        `Cannot add more. Only ${availableStock} available. You already have ${cart.items[existingItemIndex].quantity} in cart.`
      );
    }

    if (newQuantity > 10) {
      throw new ApiError(400, "Maximum 10 items per product allowed");
    }

    cart.items[existingItemIndex].quantity = newQuantity;
    cart.items[existingItemIndex].price = itemPrice;
  } else {
    // ── Add new item ──
    if (quantity > 10) {
      throw new ApiError(400, "Maximum 10 items per product allowed");
    }

    cart.items.push({
      product: productId,
      name: product.name,
      image: product.image.url || product.image,
      price: itemPrice,
      quantity,
      color: color || null,
      size: size || null,
      variantId: variantId || null,
      sku: itemSku,
    });
  }

  await cart.save();

  // Populate for response
  await cart.populate({
    path: "items.product",
    select: "name price oldPrice image stock variants isActive",
  });

  res.status(200).json({
    success: true,
    message:
      existingItemIndex > -1
        ? "Cart updated successfully"
        : "Item added to cart",
    cart,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3️⃣  UPDATE CART ITEM QUANTITY
// PUT /api/cart/:itemId
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const updateCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  // ── Validate ──
  if (!quantity || quantity < 1) {
    throw new ApiError(400, "Quantity must be at least 1");
  }

  if (quantity > 10) {
    throw new ApiError(400, "Maximum 10 items per product allowed");
  }

  // ── Find cart ──
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  // ── Find item in cart ──
  const cartItem = cart.items.id(itemId);

  if (!cartItem) {
    throw new ApiError(404, "Item not found in cart");
  }

  // ── Check stock ──
  const product = await Product.findById(cartItem.product);

  if (!product) {
    throw new ApiError(404, "Product no longer exists");
  }

  if (!product.isActive) {
    throw new ApiError(400, "Product is currently unavailable");
  }

  let availableStock = product.stock;

  // Check variant stock
  if (cartItem.variantId) {
    const variant = product.variants.id(cartItem.variantId);

    if (variant) {
      availableStock = variant.stock;
    }
  } else if (product.variants.length > 0 && cartItem.color) {
    const variant = product.variants.find((v) => {
      const colorMatch = cartItem.color
        ? v.color?.toLowerCase() === cartItem.color.toLowerCase()
        : true;
      const sizeMatch = cartItem.size
        ? v.size?.toLowerCase() === cartItem.size.toLowerCase()
        : true;
      return colorMatch && sizeMatch;
    });

    if (variant) {
      availableStock = variant.stock;
    }
  }

  if (quantity > availableStock) {
    throw new ApiError(
      400,
      `Only ${availableStock} items available in stock`
    );
  }

  // ── Update quantity ──
  cartItem.quantity = quantity;

  // ── Update price (in case price changed) ──
  if (cartItem.variantId) {
    const variant = product.variants.id(cartItem.variantId);
    cartItem.price = variant?.price || product.price;
  } else {
    cartItem.price = product.price;
  }

  await cart.save();

  await cart.populate({
    path: "items.product",
    select: "name price oldPrice image stock variants isActive",
  });

  res.status(200).json({
    success: true,
    message: "Cart item updated",
    cart,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4️⃣  REMOVE ITEM FROM CART
// DELETE /api/cart/:itemId
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const removeFromCart = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  // ── Find item ──
  const itemIndex = cart.items.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    throw new ApiError(404, "Item not found in cart");
  }

  const removedItem = cart.items[itemIndex].name;

  // ── Remove item ──
  cart.items.splice(itemIndex, 1);

  await cart.save();

  await cart.populate({
    path: "items.product",
    select: "name price oldPrice image stock variants isActive",
  });

  res.status(200).json({
    success: true,
    message: `${removedItem} removed from cart`,
    cart,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5️⃣  CLEAR ENTIRE CART
// DELETE /api/cart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  if (cart.items.length === 0) {
    throw new ApiError(400, "Cart is already empty");
  }

  cart.items = [];
  cart.totalDiscount = 0;

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
    cart,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6️⃣  INCREMENT QUANTITY (+1)
// PATCH /api/cart/:itemId/increment
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const incrementQuantity = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const cartItem = cart.items.id(itemId);

  if (!cartItem) {
    throw new ApiError(404, "Item not found in cart");
  }

  // ── Check stock ──
  const product = await Product.findById(cartItem.product);

  if (!product || !product.isActive) {
    throw new ApiError(400, "Product is unavailable");
  }

  let availableStock = product.stock;

  if (cartItem.variantId) {
    const variant = product.variants.id(cartItem.variantId);
    if (variant) availableStock = variant.stock;
  }

  if (cartItem.quantity + 1 > availableStock) {
    throw new ApiError(400, `Only ${availableStock} items available`);
  }

  if (cartItem.quantity + 1 > 10) {
    throw new ApiError(400, "Maximum 10 items per product allowed");
  }

  cartItem.quantity += 1;

  await cart.save();

  await cart.populate({
    path: "items.product",
    select: "name price oldPrice image stock variants isActive",
  });

  res.status(200).json({
    success: true,
    message: "Quantity increased",
    cart,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7️⃣  DECREMENT QUANTITY (-1)
// PATCH /api/cart/:itemId/decrement
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const decrementQuantity = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const cartItem = cart.items.id(itemId);

  if (!cartItem) {
    throw new ApiError(404, "Item not found in cart");
  }

  if (cartItem.quantity <= 1) {
    // ── Remove item if quantity becomes 0 ──
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    cart.items.splice(itemIndex, 1);

    await cart.save();

    await cart.populate({
      path: "items.product",
      select: "name price oldPrice image stock variants isActive",
    });

    return res.status(200).json({
      success: true,
      message: "Item removed from cart (quantity was 1)",
      cart,
    });
  }

  cartItem.quantity -= 1;

  await cart.save();

  await cart.populate({
    path: "items.product",
    select: "name price oldPrice image stock variants isActive",
  });

  res.status(200).json({
    success: true,
    message: "Quantity decreased",
    cart,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8️⃣  GET CART COUNT (for navbar badge)
// GET /api/cart/count
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const getCartCount = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).select(
    "totalItems"
  );

  res.status(200).json({
    success: true,
    count: cart ? cart.totalItems : 0,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9️⃣  APPLY COUPON / DISCOUNT
// POST /api/cart/apply-coupon
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const applyCoupon = asyncHandler(async (req, res) => {
  const { couponCode } = req.body;

  if (!couponCode) {
    throw new ApiError(400, "Coupon code is required");
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  // ── Hardcoded coupons for now ──
  // Replace with Coupon model later
  const coupons = {
    SAVE10: { type: "percentage", value: 10, minOrder: 500 },
    SAVE20: { type: "percentage", value: 20, minOrder: 1000 },
    FLAT100: { type: "flat", value: 100, minOrder: 999 },
    FLAT500: { type: "flat", value: 500, minOrder: 4999 },
    WELCOME: { type: "percentage", value: 15, minOrder: 0 },
  };

  const coupon = coupons[couponCode.toUpperCase()];

  if (!coupon) {
    throw new ApiError(400, "Invalid coupon code");
  }

  if (cart.totalPrice < coupon.minOrder) {
    throw new ApiError(
      400,
      `Minimum order of ₹${coupon.minOrder} required for this coupon`
    );
  }

  // ── Calculate discount ──
  let discount = 0;

  if (coupon.type === "percentage") {
    discount = Math.round((cart.totalPrice * coupon.value) / 100);
  } else {
    discount = coupon.value;
  }

  // Discount can't exceed total price
  if (discount > cart.totalPrice) {
    discount = cart.totalPrice;
  }

  cart.totalDiscount = discount;

  await cart.save();

  await cart.populate({
    path: "items.product",
    select: "name price oldPrice image stock variants isActive",
  });

  res.status(200).json({
    success: true,
    message: `Coupon ${couponCode.toUpperCase()} applied! You save ₹${discount}`,
    cart,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔟  REMOVE COUPON
// DELETE /api/cart/remove-coupon
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const removeCoupon = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  cart.totalDiscount = 0;

  await cart.save();

  await cart.populate({
    path: "items.product",
    select: "name price oldPrice image stock variants isActive",
  });

  res.status(200).json({
    success: true,
    message: "Coupon removed",
    cart,
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1️⃣1️⃣  VALIDATE CART (before checkout)
// GET /api/cart/validate
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const validateCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  const issues = [];
  const validItems = [];

  for (const item of cart.items) {
    const product = await Product.findById(item.product);

    // Product deleted
    if (!product) {
      issues.push({
        itemId: item._id,
        name: item.name,
        issue: "Product no longer exists",
        action: "removed",
      });
      continue;
    }

    // Product inactive
    if (!product.isActive) {
      issues.push({
        itemId: item._id,
        name: item.name,
        issue: "Product is currently unavailable",
        action: "removed",
      });
      continue;
    }

    // Check stock
    let availableStock = product.stock;

    if (item.variantId) {
      const variant = product.variants.id(item.variantId);
      if (variant) {
        availableStock = variant.stock;
      } else {
        issues.push({
          itemId: item._id,
          name: item.name,
          issue: "Selected variant no longer available",
          action: "removed",
        });
        continue;
      }
    }

    // Out of stock
    if (availableStock === 0) {
      issues.push({
        itemId: item._id,
        name: item.name,
        issue: "Out of stock",
        action: "removed",
      });
      continue;
    }

    // Quantity exceeds stock
    if (item.quantity > availableStock) {
      item.quantity = availableStock;
      issues.push({
        itemId: item._id,
        name: item.name,
        issue: `Only ${availableStock} available. Quantity adjusted.`,
        action: "adjusted",
      });
    }

    // Price changed
    let currentPrice = product.price;
    if (item.variantId) {
      const variant = product.variants.id(item.variantId);
      currentPrice = variant?.price || product.price;
    }

    if (item.price !== currentPrice) {
      issues.push({
        itemId: item._id,
        name: item.name,
        issue: `Price changed from ₹${item.price} to ₹${currentPrice}`,
        action: "price_updated",
      });
      item.price = currentPrice;
    }

    validItems.push(item);
  }

  // ── Update cart with valid items only ──
  cart.items = validItems;
  await cart.save();

  await cart.populate({
    path: "items.product",
    select: "name price oldPrice image stock variants isActive",
  });

  res.status(200).json({
    success: true,
    isValid: issues.length === 0,
    issues,
    cart,
  });
});