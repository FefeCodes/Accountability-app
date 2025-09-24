import { useState, useEffect } from "react";
import Header from "../Header";
import PartnersMainContent from "./partners-compt/PartnersMainContent";
import SideBar from "../SideBar";

export default function Partners() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 z-30">
        <SideBar />
      </aside>

      <div
        className={`fixed inset-0 z-40 flex md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="flex-1 bg-black transition-opacity duration-300"
          style={{ opacity: sidebarOpen ? 0.5 : 0 }}
          onClick={() => setSidebarOpen(false)}
        />

        <div
          className={`w-64 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <SideBar />
        </div>
      </div>

      <div className="flex flex-col flex-1 md:ml-64" role="main">
        <div className="fixed top-0 left-0 right-0 md:left-64 z-20">
          <Header title="Partners" onMenuClick={() => setSidebarOpen(true)} />
        </div>
        <div className="mt-20 px-1 sm:px-4 sm:py-2 overflow-y-auto h-[calc(100vh-5rem)]">
          <PartnersMainContent />
        </div>
      </div>
    </div>
  );
}
