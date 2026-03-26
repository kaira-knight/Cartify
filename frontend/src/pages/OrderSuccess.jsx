import { Link } from "react-router-dom";

const OrderSuccess = ({ user }) => {
  return (
    <div className="min-h-screen bg-green-50 text-center">
      <Navbar user={user} />

      <div className="mt-20 space-y-4">
        <h2 className="text-3xl font-bold text-green-600">
          Order Placed Successfully
        </h2>

        <p className="text-lg">
          Order ID: 123456
        </p>

        <Link
          to="/orders"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Track Order
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;