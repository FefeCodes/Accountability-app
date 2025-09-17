import { useState } from "react";
import Header from "../../Header";
import SideBar from "../../SideBar";
import ConnectProfileMain from "./ConnectProfileMain";

export default function ConnectProfile() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full flex flex-row min-h-screen bg-gray-100">
      {/* Desktop Sidebar (fixed) */}
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-white shadow-md z-30">
        <SideBar />
      </aside>

      {/* Main content */}
      <div className="flex flex-col">
        {/* Fixed header */}
        <div className="fixed top-0 left-0 right-0 md:left-64 z-20 bg-white shadow-sm">
          <Header title="Partners" />
        </div>

        {/* Page Content */}
        <main className="px-2 sm:py-2 overflow-y-auto">
          <ConnectProfileMain />
        </main>
      </div>
    </div>
  );
}
