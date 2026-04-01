// =============================
// FILE 1: PromoSection.jsx
// =============================

import React from "react";
import "./PromoSection.css";

const PromoSection = () => {
  return (
    <div>

      {/* HEADER */}
      <div className="section-header">
        <span className="section-label">Featured</span>
        <h2 className="section-title">New Arrival</h2>
      </div>

      {/* CARDS CONTAINER */}
      <div className="promo-container">

        {/* LEFT BIG CARD WITH IMAGE */}
        <div
          className="promo-card large"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1606813907291-d86efa9b94db')" /* Replace with your image */
          }}
        >
          <div className="overlay">
            <p className="promo-title">
              Black and White version of the PS5 coming out on sale.
            </p>

            <button className="shop-btn">
              Shop Now
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-cards">

          {/* SPEAKER IMAGE */}
          <div
            className="promo-card small"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1546435770-a3e426bf472b')" /* Replace */
            }}
          >
            <div className="overlay">
              <h3>Speakers</h3>
              <p>Amazon wireless speakers</p>

              <button className="shop-btn">
                Shop Now
              </button>
            </div>
          </div>

          {/* PERFUME IMAGE */}
          <div
            className="promo-card small"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1585386959984-a41552231658')" /* Replace */
            }}
          >
            <div className="overlay">
              <h3>Perfume</h3>
              <p>GUCCI INTENSE OUD EDP</p>

              <button className="shop-btn">
                Shop Now
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default PromoSection;


// =============================
// FILE 2: PromoSection.css
// =============================

