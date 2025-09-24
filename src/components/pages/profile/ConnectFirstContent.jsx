import { useState } from "react";
import defaultUserIcon from "../../../assets/ui_user.svg";
import ContactModal from "../../ContactModal";
import ConnectionModal from "../../ConnectionModal";

export default function ConnectFirstContent({ partner }) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showConnectionModal, setShowConnectionModal] = useState(false);

  if (!partner) {
    return (
      <div className="w-full flex items-center justify-center p-8 bg-white rounded-xl shadow-md">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleConnectClick = () => {
    setShowConnectionModal(true);
  };

  const handleMessageClick = () => {
    setShowContactModal(true);
  };

  const handleConnectionSuccess = () => {
    // Refresh the page or update the UI
    window.location.reload();
  };

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row items-start justify-between p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-md">
        {/* Profile Image */}
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
          <div className="rounded-full overflow-hidden w-16 h-16 sm:w-20 sm:h-20 border-2 border-gray-200">
            <img
              src={partner.profilePicture || defaultUserIcon}
              alt={partner.fullName || partner.name || "User"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full flex flex-row sm:flex-row justify-between items-start gap-1 sm:gap-4">
          <div className="flex flex-col gap-y-4 flex-1">
            <div className="flex flex-col gap-y-1">
              <h3 className="font-semibold text-xl sm:text-2xl text-gray-900">
                {partner.fullName || partner.name || "Unknown User"}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {partner.bio || partner.goals?.[0] || "No bio available"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {partner.isConnected ? (
                <button
                  onClick={handleMessageClick}
                  className="bg-green-600 hover:bg-green-700 rounded-full px-6 py-3 text-white font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  Message
                </button>
              ) : (
                <button
                  onClick={handleConnectClick}
                  className="bg-blue-600 hover:bg-blue-700 rounded-full px-6 py-3 text-white font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Connect
                </button>
              )}
              <button
                onClick={handleMessageClick}
                className="border border-gray-400 hover:border-gray-600 hover:bg-gray-50 px-6 py-3 text-gray-700 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
              >
                Message
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col justify-end gap-y-1 text-right">
            <p className="font-medium text-gray-500 text-sm">
              @
              {(partner.fullName || partner.name)
                ?.toLowerCase()
                .replace(/\s+/g, "") || "user"}
            </p>
            <p className="font-light text-gray-400 text-sm">
              {partner.timezone}
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        partner={partner}
      />

      <ConnectionModal
        isOpen={showConnectionModal}
        onClose={() => setShowConnectionModal(false)}
        partner={partner}
        onSuccess={handleConnectionSuccess}
      />
    </>
  );
}
