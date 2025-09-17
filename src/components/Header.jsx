import { useAuth } from "../hooks/useAuth";
import { MenuIcon } from "../assets/svgIcons";

export default function Header({ title = "Dashboard Overview", onMenuClick }) {
  const { userProfile } = useAuth();
  const placeholder = "/assets/ui_user.svg";

  return (
    <header className="w-full h-20 px-4 md:px-6 flex items-center justify-between bg-white">
      {/* Left: Mobile menu button + Title */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden mr-1 p-2 rounded-md hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Open navigation menu"
          >
            <MenuIcon className="h-6 w-6 text-gray-700" />
          </button>
        )}
        <p className="text-xl md:text-3xl font-semibold text-gray-800">
          {title}
        </p>
      </div>

      {/* User avatar */}
      <div>
        <button
          className="p-1 rounded-full overflow-hidden w-8 h-8 sm:w-10 sm:h-10 border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
          aria-label="Account menu"
        >
          <img
            src={userProfile?.profilePicture || placeholder}
            alt="User avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>
    </header>
  );
}
