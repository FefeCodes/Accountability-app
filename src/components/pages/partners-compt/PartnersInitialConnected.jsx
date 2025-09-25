import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase"; // adjust to your setup
import { Link } from "react-router-dom";
import defaultUserIcon from "../../../assets/ui_user.svg";
import ContactModal from "../../ContactModal";

export default function PartnersInitialConnected({
  partner = {},
  user = {},
  onButtonClick = () => {},
}) {
  const [loading, setLoading] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [userData, setUserData] = useState(null);

  // Use partner data if available, otherwise fall back to user data
  const data = partner.id ? partner : user;

  useEffect(() => {
    if (data?.id) {
      const fetchUser = async () => {
        try {
          const ref = doc(db, "users", data.id); // assumes users collection
          const snap = await getDoc(ref);
          if (snap.exists()) {
            setUserData(snap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUser();
    }
  }, [data?.id]);

  const handleMessageClick = () => {
    setShowContactModal(true);
  };

  const handleClick = () => {
    setLoading(true);
    onButtonClick(data, setLoading);
  };

  const getButton = () => {
    if (loading) {
      return (
        <button
          disabled
          className="w-full px-4 py-2 text-base font-medium text-white bg-gray-400 rounded-lg opacity-80 cursor-wait"
        >
          Sending…
        </button>
      );
    }

    switch (data.connectionStatus) {
      case "connected":
        return (
          <button
            disabled
            className="w-full px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-lg opacity-80 cursor-not-allowed"
          >
            Connected
          </button>
        );

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
            onClick={handleMessageClick}
            className="w-full px-4 py-2 text-base font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 hover:text-white transition"
          >
            Message
          </button>
        );
    }
  };

  const displayData = userData || data; // prefer DB data if loaded

  return (
    <div className="w-full sm:w-full lg:w-full flex flex-col items-center justify-between p-4 bg-white rounded-xl shadow-sm">
      <div className="flex flex-col items-center gap-3">
        {/* Profile Image with fallback */}
        <div className="w-16 h-16 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center">
          <img
            src={
              displayData.profilePicture || displayData.image || defaultUserIcon
            }
            alt={displayData.fullName || "User"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center justify-center text-center">
          <Link
            to={`/connected-profile/${data.id}`}
            className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition pb-3"
          >
            {displayData.fullName}
          </Link>

          <p className="text-base text-gray-500">
            {displayData.goals?.[0].title || displayData.goal}
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="mt-4 w-full">{getButton()}</div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        partner={displayData}
      />
    </div>
  );
}
