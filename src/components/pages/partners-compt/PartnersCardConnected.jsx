import { Link } from "react-router-dom";
import defaultUserIcon from "../../../assets/ui_user.svg"; // adjust path

export default function PartnersCardConnected({ user = {} }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        {/* Profile Image */}
        <div className="w-12 h-12 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center">
          <img
            src={user.image || defaultUserIcon}
            alt={user.name || "User"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div>
          <Link
            to="/connected-profile"
            className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition"
          >
            {user.name || "Jane Smith"}
          </Link>
          <p className="text-xs text-gray-500">Already connected partner</p>
        </div>
      </div>

      {/* Button */}
      <div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition">
          Message
        </button>
      </div>
    </div>
  );
}
