import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const SellerLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    // 1. Fixed height container that prevents the whole page from scrolling
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      
      {/* 2. Sidebar: Always full height, stays on the left */}
      <Sidebar collapsed={collapsed} />

      {/* 3. Main wrapper: Column for Topbar + Content */}
      <div className="flex flex-col flex-1 min-w-0 h-full">
        
        {/* 4. Topbar: Stays at the top */}
        <Topbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* 5. Content Area: This is the ONLY part that scrolls */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
