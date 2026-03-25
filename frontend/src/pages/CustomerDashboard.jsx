import React from "react";
import "./Dashboard.css";

function CustomerDashboard() {
  return (
    <div className="dashboard-container">

      {/* Header */}

      <header className="dashboard-header">
        <h1>Customer Dashboard</h1>
        <p>
          Welcome back! Here you can manage your orders,
          wishlist, and profile.
        </p>
      </header>

      {/* Image */}

      <div className="dashboard-image">
        <img
          src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df"
          alt="Customer Shopping"
        />
      </div>

      {/* Sections */}

      <div className="dashboard-cards">

        <div className="card">
          <h3>My Orders</h3>
          <p>Track your recent purchases</p>
        </div>

        <div className="card">
          <h3>Wishlist</h3>
          <p>View saved products</p>
        </div>

        <div className="card">
          <h3>Profile</h3>
          <p>Update your personal details</p>
        </div>

      </div>

    </div>
  );
}

export default CustomerDashboard;