import { Link } from "react-router-dom";
import { useState } from "react";
import defaultUserIcon from "../../../assets/ui_user.svg";
import ContactModal from "../../ContactModal";
import ConnectionModal from "../../ConnectionModal";

export default function PartnersCard({ partner = {}, user = {} }) {
  const [loading] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showConnectionModal, setShowConnectionModal] = useState(false);

  // Use partner data if available, otherwise fall back to user data
  const data = partner.id ? partner : user;

  const handleConnectClick = () => {
    setShowConnectionModal(true);
  };

  const handleMessageClick = () => {
    setShowContactModal(true);
  };

  const handleConnectionSuccess = () => {
    // Refresh the partners list or update the UI
    window.location.reload(); // Simple refresh for now
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

    if (data.isConnected) {
      return (
        <button
          onClick={handleMessageClick}
          className="w-full px-4 py-2 text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
        >
          Message
        </button>
      );
    }

    switch (data.connectionStatus) {
      case "pending":
        return (
          <button
            disabled
            className="w-full px-4 py-2 text-base font-medium text-white bg-yellow-500 rounded-lg opacity-80 cursor-not-allowed"
          >
            Pending
          </button>
        );

      default:
        return (
          <button
            onClick={handleConnectClick}
            className="w-full px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Connect
          </button>
        );
    }
  };

  return (
    <div className="w-full sm:w-full lg:w-full flex flex-col items-center justify-between p-4 bg-white rounded-xl shadow-sm">
      <div className="flex flex-col items-center gap-3">
        {/* Profile Image */}
        <div className="w-16 h-16 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center">
          <img
            src={data.profilePicture || data.image || defaultUserIcon}
            alt={data.fullName || data.name || "User"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center justify-center text-center">
          <Link
            to={`/connect-profile/${data.uid || data.id}`}
            className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition pb-3"
          >
            {data.fullName || data.name || "John Doe"}
          </Link>
          <p className="text-base text-gray-500">
            {data.goals?.[0] ||
              data.goal ||
              "Learn React and work on a project"}
          </p>
        </div>
      </div>

      <div className="mt-4 w-full">{getButton()}</div>

      {/* Modals */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        partner={data}
      />

      <ConnectionModal
        isOpen={showConnectionModal}
        onClose={() => setShowConnectionModal(false)}
        partner={data}
        onSuccess={handleConnectionSuccess}
      />
    </div>
  );
}
