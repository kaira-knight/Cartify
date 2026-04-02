
import React, { useState } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "LCD Monitor",
      price: 650,
      quantity: 1,
      image: "https://x.imastudent.com/content/0016679_philips-24-inch-full-hd-ips-ultra-wide-lcd-monitor-246e9qjab94_500.png"
    },
    {
      id: 2,
      name: "H1 Gamepad",
      price: 550,
      quantity: 2,
      image: "https://vlebazaar.in/image/cache/catalog/Ant-Esports-GP110-Wired-Gamepad-Compatible-for-PC-Laptop-Computer-Window/Ant-Esports-GP110-Wired-Gamepad-Compatible-for-PC-Laptop-Computer-Windows-108-7--1500x1500.jpg"
    }
  ]);

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );
    setCartItems(updatedCart);
  };

  // Change quantity from dropdown
  const changeQuantity = (id, value) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Number(value) }
        : item
    );

    setCartItems(updatedCart);
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">

      <h2>Home/Cart</h2>

      <table className="cart-table">

        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>

          {cartItems.map((item) => (
            <tr key={item.id}>

              <td className="product-info">

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  ✖
                </button>

                <img
                  src={item.image}
                  alt={item.name}
                />

                {item.name}

              </td>

              <td>
                ${item.price}
              </td>

              <td>
                <div className="qty-control">

                  <button
                    className="qty-btn"
                    onClick={() =>
                      changeQuantity(
                        item.id,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                  >
                    −
                  </button>

                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      changeQuantity(
                        item.id,
                        e.target.value
                      )
                    }
                    className="qty-dropdown"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>

                  <button
                    className="qty-btn"
                    onClick={() =>
                      changeQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>
              </td>

              <td>
                ${
                  item.price * item.quantity
                }
              </td>

            </tr>
          ))}

        </tbody>

      </table>

      {/* Buttons below product list */}

      <div className="cart-buttons">

        <button className="return-btn">
          Return To Shop
        </button>

        <button className="update-btn">
          Update Cart
        </button>

      </div>

      {/* Apply Coupon Section */}
<div className="down">
    <div className="coupon">
          <input
            type="text"
            placeholder="Coupon Code"
          />

          <button className="apply-btn">
            Apply Coupon
          </button>
        </div>

      {/* Cart Total Section */}

      <div className="cart-total">

        <h3>Cart Total</h3>

        <div className="total-row">
          <span>Subtotal:</span>
          <span>${subtotal}</span>
        </div>

        <div className="total-row">
          <span>Shipping:</span>
          <span>Free</span>
        </div>

        <div className="total-row total">
          <span>Total:</span>
          <span>${subtotal}</span>
        </div>

        <button className="checkout-btn">
          Proceed to Checkout
        </button>

      </div>

    </div>
    </div>
  );
};

export default Cart;
