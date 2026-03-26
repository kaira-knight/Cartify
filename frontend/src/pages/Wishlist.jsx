import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const Wishlist = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          My Wishlist
        </h2>

        <ProductCard />
      </div>
    </div>
  );
};

export default Wishlist;