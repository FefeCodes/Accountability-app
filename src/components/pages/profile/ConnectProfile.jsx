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

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="flex-1 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="w-64 bg-white h-full shadow-xl">
            <SideBar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Fixed header */}
        <div className="fixed top-0 left-0 right-0 md:left-64 z-20 bg-white shadow-sm">
          <Header title="Partners" onMenuClick={() => setIsMobileMenuOpen(true)} />
        </div>

        {/* Page Content */}
        <main className="mt-20 px-2 sm:py-2 overflow-y-auto">
          <ConnectProfileMain />
        </main>
      </div>
    </div>
  );
}
