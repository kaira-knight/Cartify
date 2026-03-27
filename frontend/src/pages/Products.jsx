import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import SortDropdown from "../components/SortDropdown";

const Products = ({ user }) => {
  const products = [
    {
      id: 1,
      name: "Product",
      price: 999,
      rating: 4.5,
      image: "https://via.placeholder.com/200"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} />

      <div className="flex p-6 gap-6">
        <FilterSidebar />

        <div className="flex-1">
          <SortDropdown />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;