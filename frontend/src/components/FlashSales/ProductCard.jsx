import React from "react";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import "./ProductCard.css"
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">

      {/* Discount */}

      <div className="discount">
        {product.discount}
      </div>

      {/* Icons */}

      <div className="icons">

        <CiHeart className="icon" />

        <IoEyeOutline className="icon" />

      </div>

      {/* Image */}

      <div className="image-box">

        <img
          src={product.image}
          alt={product.name}
        />

        <button className="add-cart">
          Add To Cart
        </button>

      </div>

      {/* Name */}

      <h4>
        {product.name}
      </h4>

      {/* Price */}

      <div className="price">

        <span className="new">
          ${product.price}
        </span>

        <span className="old">
          ${product.oldPrice}
        </span>

      </div>

      {/* Rating */}

      <div className="rating">

        ⭐⭐⭐⭐⭐

        <span>
          ({product.reviews})
        </span>

      </div>

    </div>
  );
};

export default ProductCard;