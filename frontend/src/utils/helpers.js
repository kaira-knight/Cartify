// Format price (₹1234 → ₹1,234)
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
};

// Capitalize first letter
export const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Truncate long text
export const truncate = (text, limit = 50) => {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};