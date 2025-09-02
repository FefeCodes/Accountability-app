import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import logOutIcon from "../assets/light_logout.svg";

export default function LogOut() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session/local storage
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gray-50 p-16">
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center">
          {/* Icon + Title */}
          <div className="flex flex-row justify-center items-center gap-2 mb-6">
            <img src={logOutIcon} alt="Log Out" className="w-12 h-12" />
            <h2 className="text-3xl font-semibold text-gray-800">Log Out</h2>
          </div>

          {/* Message */}
          <p className="text-gray-600 text-xl mb-6">
            Are you sure you want to log out?
          </p>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate(-1)} // Go back if cancel
              className="px-6 py-4 rounded-lg bg-red-600 hover:bg-gray-300 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-4 rounded-lg border border-red-500 hover:bg-red-600 text-red-500 hover:text-white transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
