import { useState } from "react";
import DashboardMainContent from "./dashboard-compt/DashboardMainContent.jsx";
import Header from "../Header.jsx";
import SideBar from "../SideBar.jsx";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md z-30 transform transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <SideBar />
      </aside>

      
      <div className="flex flex-col flex-1 md:ml-64">
        
        <header className="fixed top-0 left-0 right-0 md:left-64 h-16 bg-white shadow z-20 flex items-center px-4">
          
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden mr-4 p-2 rounded-md hover:bg-gray-100"
          >
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {sidebarOpen ? (
                
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
               
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <Header />
        </header>

        
        <main className="mt-16 px-1 py-2 sm:px-4 sm:py-6 overflow-y-auto h-[calc(100vh-4rem)]">
          <DashboardMainContent />
        </main>
      </div>

      
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
        />
      )}
    </div>
  );
}
