import Navbar from "../components/Navbar";
//  import AddressForm from "../components/AddressForm";
import CouponBox from "../components/CouponBox";
import OrderSummary from "../components/OrderSummary";

const Checkout = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          <AddressForm />
          <CouponBox />
        </div>

        <OrderSummary />
      </div>
    </div>
  );
};

export default Checkout;