import { useAuth } from "../hooks/useAuth";

export default function Header({ title = "Dashboard Overview" }) {
  const { userProfile } = useAuth();
  const placeholder = "/assets/ui_user.svg"; // keep a default avatar

  return (
    <header className="w-full h-20 px-4 md:px-6 flex items-center justify-between bg-white">
      {/* Title */}
      <div className="flex-shrink-0">
        <p className="text-base md:text-3xl font-semibold text-gray-800">
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
