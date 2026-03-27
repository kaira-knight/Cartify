import React from "react";
//

function BuyerDashboard() {
  return (
    <div className="dashboard-container">

      <header className="dashboard-header">
        <h1>Buyer Dashboard</h1>

        <p>
          Browse products, manage purchases,
          and explore new deals.
        </p>
      </header>

      <div className="dashboard-image">
        <img
          src="https://images.unsplash.com/photo-1515169067868-5387ec356754"
          alt="Buyer Dashboard"
        />
      </div>

      <div className="dashboard-cards">

        <div className="card">
          <h3>Browse Products</h3>
          <p>Explore available items</p>
        </div>

        <div className="card">
          <h3>Cart</h3>
          <p>View selected products</p>
        </div>

        <div className="card">
          <h3>Payment</h3>
          <p>Complete your purchases</p>
        </div>

      </div>

    </div>
  );
}

export default BuyerDashboard;