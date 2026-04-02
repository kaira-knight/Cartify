
import React, { useState } from "react";
import "./Orders.css";

const ordersData = [
  {
    id: "ORD12345",
    date: "03 April 2026",
    total: 1750,
    status: "Shipped",
    image: "https://vlebazaar.in/image/cache/catalog/Ant-Esports-GP110-Wired-Gamepad-Compatible-for-PC-Laptop-Computer-Window/Ant-Esports-GP110-Wired-Gamepad-Compatible-for-PC-Laptop-Computer-Windows-108-7--1500x1500.jpg"
  },
  {
    id: "ORD67890",
    date: "01 April 2026",
    total: 950,
    status: "Delivered",
    image: "https://x.imastudent.com/content/0016679_philips-24-inch-full-hd-ips-ultra-wide-lcd-monitor-246e9qjab94_500.png"
  }
];

const steps = [
  "Placed",
  "Shipped",
  "Out for Delivery",
  "Delivered"
];

const OrderPage = () => {
  const [selectedOrder, setSelectedOrder] =
    useState(ordersData[0]);

  const currentStep = steps.indexOf(
    selectedOrder.status
  );

  return (
    <div className="order-container">

      <h2 className="order-heading">
        Order History
      </h2>

      {/* ORDER HISTORY TABLE */}

      <table className="order-table">

        <thead>
          <tr>
            <th>Image</th>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Track</th>
          </tr>
        </thead>

        <tbody>

          {ordersData.map((order) => (
            <tr key={order.id}>

              <td>
                <img
                  src={order.image}
                  alt="order"
                  className="order-img"
                />
              </td>

              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>

              <td>
                <button
                  className="track-btn"
                  onClick={() =>
                    setSelectedOrder(order)
                  }
                >
                  Track Order
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

      {/* TRACKING FLOW */}

      <div className="tracking-section">

        <h3>
          Tracking Order: {selectedOrder.id}
        </h3>

        <div className="status-tracker">

          {steps.map((step, index) => (
            <div
              key={index}
              className={
                index <= currentStep
                  ? "step active"
                  : "step"
              }
            >

              <div className="circle">
                {index + 1}
              </div>

              <span>{step}</span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default OrderPage;
