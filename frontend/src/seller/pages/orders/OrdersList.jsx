import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Eye, Truck, CheckCircle, Clock, XCircle, Search } from "lucide-react";
import { getOrders } from "../../../utils/api"; 

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // If your API isn't ready yet, use the mock data below
        const res = await getOrders(); 
        setOrders(res.data || []);
      } catch (err) {
        // Fallback mock data for styling
        setOrders([
          { _id: "1", orderId: "#ORD-7721", customer: "Amit Sharma", date: "2023-10-24", amount: 1200, status: "Delivered" },
          { _id: "2", orderId: "#ORD-7722", customer: "Priya Singh", date: "2023-10-25", amount: 850, status: "Processing" },
          { _id: "3", orderId: "#ORD-7723", customer: "Rahul Verma", date: "2023-10-25", amount: 540, status: "Shipped" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(o => 
    (filter === "All" || o.status === filter) &&
    (o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || o.orderId.includes(searchTerm))
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
          <p className="text-sm text-gray-500">View and track all customer shipments</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="pl-10 pr-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none bg-white shadow-sm"
          >
            <option value="All">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* ORDERS TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 uppercase text-[10px] tracking-widest font-bold border-b">
                <th className="py-4 px-6">ID & Date</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {filteredOrders.map((order) => (
                  <motion.tr 
                    layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    key={order._id} className="hover:bg-indigo-50/30 transition-colors"
                  >
                    <td className="py-5 px-6">
                      <div className="font-bold text-gray-800">{order.orderId}</div>
                      <div className="text-[10px] text-gray-400">{order.date}</div>
                    </td>
                    <td className="py-5 px-6 font-medium text-gray-600">{order.customer}</td>
                    <td className="py-5 px-6 font-bold text-gray-900">₹{order.amount}</td>
                    <td className="py-5 px-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        order.status === 'Delivered' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <button className="p-2 hover:bg-white rounded-lg text-indigo-600 border border-transparent hover:border-gray-200 transition-all">
                        <Eye size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default OrdersList; 

