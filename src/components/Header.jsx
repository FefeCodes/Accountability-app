import { useAuth } from "../hooks/useAuth";
import { MenuIcon } from "../assets/svgIcons";

export default function Header({ title = "Dashboard Overview", onMenuClick }) {
  const { userProfile } = useAuth();
  const placeholder = "/assets/ui_user.svg";

  return (
    <header className="w-full h-20 px-4 md:px-6 flex items-center justify-between bg-white">
      <div className="flex items-center gap-2 flex-shrink-0">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden mr-1 p-2 rounded-md hover:bg-gray-100"
            aria-label="Open navigation menu"
          >
            <MenuIcon className="h-6 w-6 text-gray-700" />
          </button>
        )}
        <p className="text-xl md:text-3xl font-semibold text-gray-800">
          {title}
        </p>
      </div>

      <div>
        <button
          className="rounded-full overflow-hidden w-8 h-8 sm:w-10 sm:h-10 shadow"
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
