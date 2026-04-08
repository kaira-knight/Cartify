import React from "react";
import FilterBar from "../components/FilterBar";
import ProductCard from "../../components/FlashSales/ProductCard";
import "./ProductListc.css";
import ProductsData from "../../components/FlashSales/Products.json"

function ProductList() {
  return (
    <div className="products-page">
      
     <div>

      <FilterBar />

      <p className="result-count">
        1,891 styles found
      </p>
   </div>

     <div classname="products">
              {ProductsData.products.map(product => (
      
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
      
              ))}

    </div>
      

    </div>
  );
}

export default ProductList;

