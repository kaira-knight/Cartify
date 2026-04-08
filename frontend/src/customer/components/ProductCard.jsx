import React from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <div className="image-container">

        <img
          src={product.image}
          alt={product.name}
        />

        <div className="wishlist">
          ♡
        </div>

      </div>

      <p className="product-name">
        {product.name}
      </p>

      <p className="product-price">
        {product.price}
      </p>

    </div>
  );
}

export default ProductCard;