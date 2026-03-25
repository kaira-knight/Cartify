import React from "react";
import "./Dashboard.css";

function SellerDashboard() {
  return (
    <div className="dashboard-container">

      <header className="dashboard-header">
        <h1>Seller Dashboard</h1>

        <p>
          Manage your products, orders,
          and track your business performance.
        </p>
      </header>

      <div className="dashboard-image">
        <img
          src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a"
          alt="Seller Dashboard"
        />
      </div>

      <div className="dashboard-cards">

        <div className="card">
          <h3>Add Product</h3>
          <p>Create new product listings</p>
        </div>

        <div className="card">
          <h3>Manage Products</h3>
          <p>Edit or delete products</p>
        </div>

        <div className="card">
          <h3>Orders</h3>
          <p>View customer orders</p>
        </div>

      </div>

    </div>
  );
}

export default SellerDashboard;