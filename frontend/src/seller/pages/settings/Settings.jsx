import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Lock, Shield, BellRing, Save, CreditCard, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [toggles, setToggles] = useState({ orders: true, stock: true, promo: false });

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18}/> },
    { id: 'security', label: 'Security', icon: <Lock size={18}/> },
    { id: 'billing', label: 'Plan & Billing', icon: <CreditCard size={18}/> },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Settings</h1>
        <p className="text-gray-500 text-sm">Control your account behavior and security protocols.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* TAB NAVIGATION */}
        <div className="lg:w-72 space-y-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' 
                : 'text-gray-500 hover:bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                {tab.icon}
                {tab.label}
              </div>
              {activeTab === tab.id && <ChevronRight size={16} />}
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === 'notifications' && (
              <motion.div 
                key="notif" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="p-8 border-b border-gray-50 flex items-center gap-4 bg-gray-50/50">
                   <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600"><BellRing size={24} /></div>
                   <div>
                     <h2 className="font-bold text-gray-900">Push Notifications</h2>
                     <p className="text-xs text-gray-500 uppercase font-black tracking-widest">Instant Alerts</p>
                   </div>
                </div>
                <div className="p-8 space-y-6">
                  {Object.keys(toggles).map((key) => (
                    <div key={key} className="flex items-center justify-between group">
                      <div>
                        <p className="text-sm font-bold text-gray-800 capitalize">{key} Alerts</p>
                        <p className="text-xs text-gray-400">Receive real-time system updates.</p>
                      </div>
                      <button 
                        onClick={() => setToggles({...toggles, [key]: !toggles[key]})}
                        className={`w-14 h-7 rounded-full transition-all relative ${toggles[key] ? 'bg-indigo-600' : 'bg-gray-200'}`}
                      >
                        <motion.div animate={{ x: toggles[key] ? 32 : 4 }} className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div 
                key="sec" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-red-50 text-red-600 rounded-2xl"><Shield size={24} /></div>
                  <h2 className="font-bold text-gray-900 text-xl">Account Security</h2>
                </div>
                <div className="space-y-4">
                  <input type="password" placeholder="Current Password" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all" />
                  <input type="password" placeholder="New Password" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all" />
                  <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all">Update Security Key</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Settings;
