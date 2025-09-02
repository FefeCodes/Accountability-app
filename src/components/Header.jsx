import Search from "./forms/Search.jsx";
import add from "../assets/add-rounded.svg";
import notification from "../assets/notification-line.svg";
import user from "../assets/ui_user.svg";

export default function Header({
  title = "Dashboard Overview",
  showSearch = true,
  showActions = true,
  showAdd = true,
  extraActions = null,
}) {
  return (
    <header className="w-full h-16 px-4 md:px-6 flex items-center justify-between bg-white shadow-sm">
      
      <div className="flex-shrink-0">
        <p className="text-base md:text-lg font-semibold text-gray-800">
          {title}
        </p>
      </div>

      
      {showSearch && (
        <div className="hidden sm:flex flex-1 max-w-md mx-4">
          <Search />
        </div>
      )}

      
      {showActions && (
        <div className="flex items-center gap-2 sm:gap-4">
          
          {showAdd && (
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <img src={add} alt="Add" className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          <button className="p-2 hover:bg-gray-100 rounded-full">
            <img
              src={notification}
              alt="Notifications"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </button>
          <button className="p-1 rounded-full overflow-hidden w-8 h-8 sm:w-10 sm:h-10 border">
            <img
              src={user}
              alt="User"
              className="w-full h-full object-cover"
            />
          </button>

          
          {extraActions}
        </div>
      )}
    </header>
  );
}
