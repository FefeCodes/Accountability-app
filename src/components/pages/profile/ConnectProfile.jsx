import { useState } from "react";
import Header from "../../Header";
import SideBar from "../../SideBar";
import ConnectProfileMain from "./ConnectProfileMain";

export default function ConnectProfile() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open navigation menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="w-64 bg-white h-full shadow-xl">
            <div className="flex justify-end p-4">
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-4">
              <SideBar />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (fixed) */}
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-white shadow-md z-30">
        <SideBar />
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:ml-50">
        {/* Fixed header */}
        <div className="fixed top-0 left-0 right-0 md:left-64 z-20 bg-white shadow-sm">
          <Header title="Partners" />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <ConnectProfileMain />
        </main>
      </div>
    </div>
  );
}
