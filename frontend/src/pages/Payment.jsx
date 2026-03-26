import Navbar from "../components/Navbar";

const Payment = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Navbar user={user} />

      <div className="bg-white p-6 rounded shadow w-full max-w-md mt-10 space-y-4">
        <h2 className="text-xl font-semibold">
          Enter Card Details
        </h2>

        <input
          type="text"
          placeholder="Card Number"
          className="border p-2 w-full rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Pay Now
        </button>
      </div>
    </div>
  );
};
export default Payment;