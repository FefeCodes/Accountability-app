import { useState } from "react";
import Header from "../Header";
import PartnersMainContent from "./partners-compt/PartnersMainContent";
import SideBar from "../SideBar";

export default function Partners() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 z-30">
        <SideBar />
      </aside>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="flex-1 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="w-64 bg-white h-full shadow-xl">
            <SideBar />
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-col flex-1 md:ml-64" role="main">
        <div className="fixed top-0 left-0 right-0 md:left-64 z-20">
          <Header title="Partners" onMenuClick={() => setSidebarOpen(true)} />
        </div>
        <div className="mt-20 px-2 sm:px-4 sm:py-2 overflow-y-auto h-[calc(100vh-5rem)]">
          <PartnersMainContent />
        </div>
      </div>
    </div>
  );
}
