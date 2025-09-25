import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import defaultUserIcon from "../../../assets/ui_user.svg";
import ContactModal from "../../ContactModal";

export default function PartnersCardConnected({ partner = {}, user = {} }) {
  const [showContactModal, setShowContactModal] = useState(false);

  // Use partner data if available, otherwise fall back to user data
  const data = partner.id ? partner : user;

  const { userProfile } = useAuth();

  const handleMessageClick = () => {
    setShowContactModal(true);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3">
          {/* Profile Image */}
          <div className="w-12 h-12 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center">
            <img
              src={data.profilePicture || data.image || defaultUserIcon}
              alt={data.fullName || "User"}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <Link
              to={`/connected-profile/${data.id}`}
              className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition"
            >
              {data.name}
            </Link>
            <p className="text-base text-gray-900">{data?.fullName}</p>
          </div>
        </div>

        <div>
          <button
            onClick={handleMessageClick}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
          >
            Message
          </button>
        </div>
      </div>

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        partner={data}
      />
    </>
  );
}
