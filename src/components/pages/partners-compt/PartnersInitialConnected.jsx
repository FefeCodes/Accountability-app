import { useState } from "react";
import defaultUserIcon from "../../../assets/ui_user.svg"; // adjust path

export default function PartnersInitialConnected({ user = {}, onButtonClick = () => {} }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onButtonClick(user, setLoading);
  };

  const getButton = () => {
    if (loading) {
      return (
        <button
          disabled
          className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded-lg opacity-80 cursor-wait"
        >
          Sending…
        </button>
      );
    }

    switch (user.connectionStatus) {
      case "connected":
        return (
          <button
            disabled
            className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg opacity-80 cursor-not-allowed"
          >
            Connected
          </button>
        );

      case "pending":
        return (
          <button
            disabled
            className="w-full px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg opacity-80 cursor-not-allowed"
          >
            Pending
          </button>
        );

      default:
        return (
          <button
            onClick={handleClick}
            className="w-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 hover:text-white transition"
          >
            Connected
          </button>
        );
    }
  };

  return (
    <div className="w-full sm:w-3/4 lg:w-3/4 flex flex-col items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex flex-col items-center gap-3">
        {/* Profile Image with fallback */}
        <div className="w-16 h-16 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center">
          <img
            src={user.image || defaultUserIcon}
            alt={user.name || "User"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-sm font-semibold text-gray-800">
            {user.name || "John Doe"}
          </h2>
          <p className="text-xs text-gray-500">
            {user.goal || "Learn React and work on a project"}
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="mt-4 w-full">{getButton()}</div>
    </div>
  );
}
