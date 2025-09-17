import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar";
import logOutIcon from "../../assets/light_logout.svg";

export default function LogOut() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
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

      <div className="flex-1 flex flex-col md:ml-64">
        <div className="fixed top-0 left-0 right-0 md:left-64 z-20">
          <Header title="Log Out" onMenuClick={() => setSidebarOpen(true)} />
        </div>
        <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 pt-24">
          <div className="bg-white rounded-xl shadow-sm px-6 sm:px-10 py-10 w-full max-w-md text-center">
            <div className="flex flex-row justify-center items-center gap-2 mb-6">
              <img src={LightLogoutIcon} alt="Log Out" className="w-12 h-12" />
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Log Out</h2>
            </div>

            <p className="text-gray-600 text-lg sm:text-xl mb-8">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-center gap-4 sm:gap-6">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 sm:px-8 py-3 rounded-lg border bg-red-600 text-white hover:bg-red-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-6 sm:px-8 py-3 rounded-lg border border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition"
              >
                Log Out
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
