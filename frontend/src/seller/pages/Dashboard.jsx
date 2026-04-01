import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";

// Mock data for the chart - Represents sales over a week
const salesData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 4500 },
  { name: "Fri", sales: 6000 },
  { name: "Sat", sales: 8000 },
  { name: "Sun", sales: 7000 },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // Simulate API Fetch
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { title: "Revenue", value: "₹45,200", icon: <DollarSign size={20} />, color: "bg-green-100 text-green-600" },
    { title: "Orders", value: "320", icon: <ShoppingCart size={20} />, color: "bg-blue-100 text-blue-600" },
    { title: "Products", value: "58", icon: <Package size={20} />, color: "bg-indigo-100 text-indigo-600" },
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse p-2">
        <div className="h-8 bg-gray-200 rounded-lg w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-gray-200 rounded-xl" />
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-xl" />
        <div className="h-48 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-8 pb-10"
    >
      {/* 1. HEADER SECTION */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-gray-500">Welcome back, here is what's happening today.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold">
          <TrendingUp size={16} />
          +12.5% Growth
        </div>
      </div>

      {/* 2. ANIMATED STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between transition-shadow hover:shadow-md"
          >
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{item.title}</p>
              <h2 className="text-2xl font-bold text-gray-800">{item.value}</h2>
            </div>
            <div className={`${item.color} p-4 rounded-2xl`}>
              {item.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. SALES CHART SECTION (RECHARTS) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-lg font-bold text-gray-800 mb-6">Revenue Analytics</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#6366f1" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSales)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* 4. RECENT ORDERS TABLE */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800">View All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 uppercase text-[10px] tracking-widest font-bold">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {[
                { id: "#1024", name: "Amit Sharma", price: "₹1200", status: "Completed", color: "text-green-600 bg-green-50" },
                { id: "#1025", name: "Priya Singh", price: "₹850", status: "Pending", color: "text-yellow-600 bg-yellow-50" },
                { id: "#1026", name: "Rahul Verma", price: "₹540", status: "Cancelled", color: "text-red-600 bg-red-50" },
              ].map((order, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-gray-700">{order.id}</td>
                  <td className="py-4 px-6 font-medium text-gray-600">{order.name}</td>
                  <td className="py-4 px-6 font-bold text-gray-800">{order.price}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${order.color}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
