import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, Settings, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  // 1. Cleaned up Main Menu (Profile & Settings removed from here)
  const menu = [
    { name: "Dashboard", path: "/seller", icon: <LayoutDashboard size={20} /> },
    { name: "Products", path: "/seller/products", icon: <Package size={20} /> },
    { name: "Orders", path: "/seller/orders", icon: <ShoppingBag size={20} /> },
  ];

  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-screen sticky top-0 bg-[#0f172a] text-gray-400 flex flex-col p-4 border-r border-gray-800 z-50 shadow-2xl overflow-y-auto custom-scrollbar flex-shrink-0"
    >
      {/* LOGO SECTION */}
      <div className="flex items-center gap-3 mb-10 px-2 h-10 overflow-hidden flex-shrink-0">
        <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20 flex-shrink-0">
          <ShoppingBag size={20} />
        </div>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-white font-black text-xl tracking-tight whitespace-nowrap"
            >
              Cartify<span className="text-indigo-500">.</span>
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      {/* MAIN MENU ITEMS */}
      <nav className="flex-1 space-y-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.name} to={item.path} className="block group">
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
                  isActive ? "bg-indigo-600/10 text-indigo-400" : "hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div layoutId="activeTab" className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-full" />
                )}
                <div className={`${isActive ? "text-indigo-500" : "group-hover:text-white"}`}>{item.icon}</div>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="text-sm font-semibold whitespace-nowrap">
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* 2. INTEGRATED BOTTOM SECTION (Profile & Settings) */}
      <div className="pt-4 border-t border-gray-800 flex-shrink-0">
         <div className={`flex items-center justify-between ${collapsed ? "flex-col gap-4" : "px-2"}`}>
            
            {/* Profile Link (via Avatar) */}
            <Link to="/seller/profile" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex-shrink-0 border-2 border-transparent group-hover:border-indigo-500 transition-all shadow-lg" />
              {!collapsed && (
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white whitespace-nowrap group-hover:text-indigo-400 transition-colors">Seller Admin</p>
                  <p className="text-[10px] text-gray-500 whitespace-nowrap">View Profile</p>
                </div>
              )}
            </Link>

            {/* Settings Link (Cog Wheel) */}
            <Link 
              to="/seller/settings" 
              className={`p-2 rounded-lg hover:bg-gray-800 transition-colors ${location.pathname === '/seller/settings' ? 'text-indigo-500 bg-gray-800' : 'text-gray-500 hover:text-white'}`}
            >
              <Settings size={collapsed ? 22 : 18} />
            </Link>
         </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
