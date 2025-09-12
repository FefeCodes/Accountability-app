import { useState } from "react";
import Header from "../Header";
import PartnersMainContent from "./partners-compt/PartnersMainContent";
import SideBar from "../SideBar";

export default function Partners() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block h-screen">
        <SideBar />
      </aside>

      {/* Sidebar Drawer for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="relative z-50 w-64 bg-white shadow-lg h-full">
            <SideBar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex flex-col flex-1" role="main">
        <Header
          title="Partners"
          onMenuClick={() => setSidebarOpen(true)}
           // Pass toggle for mobile
        />

        {/* Scrollable Area */}
        <div className="px-2 sm:px-4 sm:py-2 overflow-y-auto h-[calc(100vh-4rem)]">
          <PartnersMainContent />
        </div>
      </main>
    </div>
  );
}
