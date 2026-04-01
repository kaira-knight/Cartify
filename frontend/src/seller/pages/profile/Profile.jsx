import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Store, Mail, Phone, MapPin, Camera, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
  const fileInputRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    storeName: "Cartify Electronics",
    email: "seller@cartify.com",
    phone: "+91 98765 43210",
    address: "Bandra West, Mumbai, India",
    description: "Your one-stop shop for premium gadgets and accessories.",
    logo: null
  });

  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, logo: URL.createObjectURL(file) });
      toast.success("Logo preview updated!");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Store profile synced successfully!");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Store Profile</h1>
          <p className="text-gray-500 text-sm">Update your public store presence and contact info.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 disabled:opacity-70 active:scale-95"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {isSaving ? "Saving..." : "Save Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: LOGO CARD */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
            
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div 
                onClick={handleImageClick}
                className="w-full h-full rounded-full bg-indigo-50 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden cursor-pointer group"
              >
                {profile.logo ? (
                  <img src={profile.logo} alt="Store Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-black text-indigo-600">{profile.storeName[0]}</span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            </div>

            <h2 className="text-xl font-bold text-gray-800">{profile.storeName}</h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
              Verified Merchant
            </div>
          </div>
        </div>

        {/* RIGHT: FORM CARD */}
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Official Store Name</label>
              <div className="relative group">
                <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="text" 
                  value={profile.storeName} 
                  onChange={(e) => setProfile({...profile, storeName: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Support Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input type="text" value={profile.email} disabled className="w-full pl-12 pr-4 py-4 bg-gray-100 border-2 border-transparent rounded-2xl text-gray-400 cursor-not-allowed text-sm" />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Business Bio</label>
              <textarea 
                rows="4" 
                value={profile.description}
                onChange={(e) => setProfile({...profile, description: e.target.value})}
                className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-sm font-medium"
                placeholder="Tell customers about your brand..."
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
