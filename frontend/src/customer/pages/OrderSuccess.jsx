import React from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const orderId = "ORD-458921";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-10 text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">

            {/* Circle */}
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-md">
              <Check size={36} color="white" />
            </div>

            {/* Decorative Dots */}
            <span className="absolute -top-3 -left-6 w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="absolute -top-6 left-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            <span className="absolute -top-4 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="absolute top-2 -right-6 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            <span className="absolute bottom-0 -left-4 w-1.5 h-1.5 bg-red-500 rounded-full"></span>

          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          Thank you for ordering!
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-4">
          Your order has been successfully placed. We will notify you once it is shipped.
        </p>

        {/* Order ID */}
        <div className="bg-gray-50 border rounded-lg py-3 px-4 inline-block mb-8">
          <span className="text-gray-600 text-sm">
            Order ID:
          </span>

          <span className="ml-2 font-semibold text-gray-800">
            {orderId}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">

          {/* Track Order */}
          <button
            onClick={() => navigate("/orders")}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Track Order
          </button>

          {/* Continue Shopping */}
          <button
            onClick={() => navigate("/products")}
            className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;