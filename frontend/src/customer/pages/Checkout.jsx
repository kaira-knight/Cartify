
import React, { useState } from "react";
import "./Checkout.css";

const Checkout = () => {
  const [coupon, setCoupon] = useState("");

  const cartItems = [
    {
      id: 1,
      name: "LCD Monitor",
      price: 650,
      image: "https://x.imastudent.com/content/0016679_philips-24-inch-full-hd-ips-ultra-wide-lcd-monitor-246e9qjab94_500.png"
    },
    {
      id: 2,
      name: "H1 Gamepad",
      price: 1100,
      image: "https://vlebazaar.in/image/cache/catalog/Ant-Esports-GP110-Wired-Gamepad-Compatible-for-PC-Laptop-Computer-Window/Ant-Esports-GP110-Wired-Gamepad-Compatible-for-PC-Laptop-Computer-Windows-108-7--1500x1500.jpg"
    }
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  const handleApplyCoupon = () => {
    alert("Coupon Applied: " + coupon);
  };

  const handlePlaceOrder = () => {
    alert("Order Placed Successfully");
  };

  return (
    <div className="checkout-container">

      {/* LEFT SIDE - BILLING FORM */}

      <div className="billing-section">

        <h1>Billing Details</h1>

        <form className="billing-form">

          <label>First Name *</label>
          <input type="text" required />

          <label>Company Name</label>
          <input type="text" />

          <label>Street Address *</label>
          <input type="text" required />

          <label>Apartment, floor, etc. (optional)</label>
          <input type="text" />

          <label>Town / City *</label>
          <input type="text" required />

          <label>Phone Number *</label>
          <input type="text" required />

          <label>Email Address *</label>
          <input type="email" required />

          <div className="checkbox">
            <input type="checkbox" />
            <span>
              Save this information for faster check-out next time
            </span>
          </div>

        </form>

      </div>

      {/* RIGHT SIDE - ORDER SUMMARY */}

      <div className="summary-section">

        <h3>Order Summary</h3>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="summary-item"
          >

            <div className="item-info">
              <img
                src={item.image}
                alt={item.name}
              />
              <span>{item.name}</span>
            </div>

            <span>
              ${item.price}
            </span>

          </div>
        ))}

        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${subtotal}</span>
        </div>

        <div className="summary-row">
          <span>Shipping:</span>
          <span>Free</span>
        </div>

        <div className="summary-row total">
          <span>Total:</span>
          <span>${subtotal}</span>
        </div>

        {/* PAYMENT METHODS */}

        <div className="payment-method">

          <label>
            <input
              type="radio"
              name="payment"
            />
            Bank
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              defaultChecked
            />
            Cash on delivery
          </label>

        </div>

        {/* COUPON */}

        <div className="coupon-box">

          <input
            type="text"
            placeholder="Coupon Code"
            value={coupon}
            onChange={(e) =>
              setCoupon(e.target.value)
            }
          />

          <button
            className="apply-btn"
            onClick={handleApplyCoupon}
          >
            Apply Coupon
          </button>

        </div>

        {/* PLACE ORDER */}

        <button
          className="place-order-btn"
          onClick={handlePlaceOrder}
        >
          Proceed to Payment
        </button>

      </div>

    </div>
  );
};

export default Checkout;


