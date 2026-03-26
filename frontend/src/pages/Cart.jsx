import Navbar from "../components/Navbar";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

const Cart = ({ user }) => {
  const items = [1, 2];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} />

      <div className="flex flex-col md:flex-row gap-6 p-6">
        <div className="flex-1 space-y-4">
          {items.map((i) => (
            <CartItem key={i} />
          ))}
        </div>

        <CartSummary />
      </div>
    </div>
  );
};

export default Cart;