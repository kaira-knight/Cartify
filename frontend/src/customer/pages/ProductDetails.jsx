import React, { useState } from "react";
import "./ProductDetails.css";
import FlashSales from "../../components/FlashSales/FlashSales";

const ProductDetails = () => {
  const images = [
    "https://admindash.comcitybd.com/storage/files/shares/Test%202/G92.jpg",
    "https://images-eu.ssl-images-amazon.com/images/I/715vosKfRkL._AC_UL495_SR435,495_.jpg",
    "https://globalbrandeshop.com/media/thumbnail/I332WE12NH193.jpg",
    "https://globalbrandeshop.com/media/thumbnail/I192AU35HC425.jpg"
  ];

  const [mainImage, setMainImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(2);
  const [selectedSize, setSelectedSize] = useState("M");

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const sizes = ["XS", "S", "M", "L", "XL"];

  return (<>
    <div className="product-container">
      {/* LEFT SIDE */}
      <div className="left-section">
        <div className="thumbnail-container">
          {images.map((img, index) => (
            <div
              key={index}
              className="thumbnail"
              onClick={() => setMainImage(img)}
            >
              <img src={img} alt="thumb" />
            </div>
          ))}
        </div>

        <div className="main-image-container">
          <img src={mainImage} alt="product" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-section">
        <h2>Havic HV G-92 Gamepad</h2>

        <div className="rating">
          ⭐⭐⭐⭐⭐
          <span className="reviews">(150 Reviews)</span>
          <span className="stock"> | In Stock</span>
        </div>

        <h3 className="price">$192.00</h3>

        <p className="description">
          PlayStation 5 Controller Skin High quality vinyl with air
          channel adhesive for easy bubble free install & mess free
          removal Pressure sensitive.
        </p>

        {/* COLORS */}
        <div className="colors">
          <span>Colours:</span>
          <div className="color red"></div>
          <div className="color blue"></div>
        </div>

        {/* SIZE */}
        <div className="sizes">
          <span>Size:</span>

          {sizes.map((size) => (
            <button
              key={size}
              className={
                selectedSize === size
                  ? "size-btn active"
                  : "size-btn"
              }
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {/* QUANTITY */}
        <div className="cart-section">
          <div className="quantity">
            <button onClick={decreaseQty}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQty}>+</button>
          </div>

          <button className="buy-btn">Buy Now</button>

          <button className="wishlist">♡</button>
        </div>

        {/* DELIVERY */}
        <div className="delivery-box">
          <div>
            <strong>Free Delivery</strong>
            <p>Enter your postal code for Delivery Availability</p>
          </div>

          <div>
            <strong>Return Delivery</strong>
            <p>Free 30 Days Delivery Returns.</p>
          </div>
        </div>
      </div>
    </div>
    <FlashSales/>
    </>
  );
};

export default ProductDetails;