import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import dashboard from "../assets/mage_dashboard.svg";
import partners from "../assets/partnership-outline.svg";
import goals from "../assets/mage_goals.svg";
import myProfile from "../assets/ui_user.svg";
import logOut from "../assets/light_logout.svg";
import logo from "../assets/logo.svg";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button visible on mobile */}
      <button
        className="md:hidden p-2 m-2 rounded-md bg-gray-200"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex h-screen w-64 bg-white shadow-md flex-col p-4">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar (Overlay + Drawer) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="flex-1 bg-black bg-opacity-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Sidebar Drawer */}
          <div className="w-64 bg-white h-full shadow-lg p-4 flex flex-col">
            {/* Close button */}
            <button
              className="self-end mb-4 p-1 rounded hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}

function SidebarContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Top Section (Logo + Navigation) */}
      <div>
        <div className="flex items-center gap-2 mb-8">
          <img src={logo} alt="App Logo" className="w-8 h-8" />
          <p className="font-bold text-lg">CommitBuddy</p>
        </div>

        <div className="flex flex-col gap-2">
          <SidebarItem
            icon={dashboard}
            label="Dashboard"
            to="/dashboard"
            active={location.pathname === "/"}
          />
          <SidebarItem
            icon={partners}
            label="Partners"
            to="/partners"
            active={location.pathname === "/partners"}
          />
          <SidebarItem
            icon={goals}
            label="Goals"
            to="/goals"
            active={location.pathname === "/goals"}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-2 pt-4">
        <SidebarItem
          icon={myProfile}
          label="My Profile"
          to="/my-profile"
          active={location.pathname === "/my-profile"}
        />
        <SidebarItem
          icon={logOut}
          label="Log Out"
          to="/logout"
          danger
          active={location.pathname === "/logout"}
        />
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, to, active, danger }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors 
        ${active ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700 hover:bg-gray-100"} 
        ${danger ? "hover:bg-red-100 text-red-600" : ""}`}
    >
      <img src={icon} alt={`${label} Icon`} className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
}

