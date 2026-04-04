import React, { useState } from "react";
import ProductCard from "../../components/FlashSales/ProductCard";
import productsData from "../../components/FlashSales/Products.json"

const Wishlist = () => {
  // Example: initially some items saved
  const [wishlist, setWishlist] = useState(
    productsData.products.slice(0, 6)
  );

  // Remove item
  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="px-8 py-6">

      {/* Breadcrumb */}
      <div className="text-gray-500 text-sm mb-6">
        Home &gt; My Account &gt;{" "}
        <span className="text-black font-medium">
          Wishlist
        </span>
      </div>

      {/* Wishlist Count */}
      <h2 className="text-lg font-semibold mb-6">
        Wishlisted Products: {wishlist.length}
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">

        {wishlist.map((product) => (
          <div key={product.id} className="relative">

            {/* Remove Button */}
            <button
              onClick={() =>
                removeFromWishlist(product.id)
              }
              className="absolute top-2 right-29 bg-white border rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white transition z-10"
            >
              ✕
            </button>

            <ProductCard product={product} />

          </div>
        ))}

      </div>

    </div>
  );
};

export default Wishlist;