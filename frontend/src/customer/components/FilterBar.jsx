import React from "react";
import "./FilterBar.css";

function FilterBar() {
  return (
    <div className="filter-bar">

      <select>
        <option>Sort</option>
        <option>Price Low to High</option>
        <option>Price High to Low</option>
      </select>

      <select>
        <option>New in date</option>
      </select>

      <select>
        <option>Category</option>
      </select>

      <select>
        <option>Product Type</option>
      </select>

      <select>
        <option>Style</option>
      </select>

      <select>
        <option>Brand</option>
      </select>

      <select>
        <option>Colour</option>
      </select>

      <select>
        <option>Body Fit</option>
      </select>

      <select>
        <option>Size</option>
      </select>

      <select>
        <option>Price Range</option>
      </select>

    </div>
  );
}

export default FilterBar;