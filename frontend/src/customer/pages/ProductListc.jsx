import React from "react";
import FilterBar from "../components/FilterBar";
import ProductCard from "../../components/FlashSales/ProductCard";
import "./ProductListc.css";
import ProductsData from "../../components/FlashSales/Products.json"

const products = [
  {
    id: 1,
    name: "Jack & Jones ringer t-shirt in green",
    price: "£19.00",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  },
  {
    id: 2,
    name: "Calvin Klein lounge t-shirt in beige",
    price: "$40.00",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1"
  },
  {
    id: 3,
    name: "Versace roses print t-shirt",
    price: "$207.00",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38"
  },
  {
    id: 4,
    name: "Lacoste relaxed fit t-shirt",
    price: "£65.00",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38"
  }
];

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

