import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../config/firebase";
import logOutIcon from "../assets/light_logout.svg";

export default function LogoutModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOutUser();
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-xl px-6 sm:px-10 py-10 w-full max-w-md mx-4 transform transition-all">
        <div className="flex flex-row justify-center items-center gap-2 mb-6">
          <img src={logOutIcon} alt="Log Out" className="w-12 h-12" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Log Out
          </h2>
        </div>

        <p className="text-gray-600 text-lg sm:text-xl mb-8 text-center">
          Are you sure you want to log out?
        </p>

        <div className="flex justify-center gap-4 sm:gap-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-6 sm:px-8 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="px-6 sm:px-8 py-3 rounded-lg border border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition disabled:opacity-50"
          >
            {isLoading ? "Logging out..." : "Log Out"}
          </button>
        </div>
      </div>
    </div>
  );
}
