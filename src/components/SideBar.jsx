import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function SideBar() {
  return (
    <nav className="h-full w-64 bg-white shadow-md flex flex-col px-4 pt-8 pb-6" aria-label="Primary">
      <SidebarContent />
    </nav>
  );
}

function SidebarContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Logo */}
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-2 mb-8">
          <img src={logo} alt="App Logo" className="w-8 h-8" />
          <p className="font-bold text-lg">CommitBuddy</p>
        </div>

        {/* Main Links */}
        <div className="flex flex-col gap-2">
          <SidebarItem
            icon={<DashboardIcon />}
            label="Dashboard"
            to="/dashboard"
            active={location.pathname.startsWith("/dashboard")}
          />
          <SidebarItem
            icon={<PartnersIcon />}
            label="Partners"
            to="/partners"
            active={
              location.pathname === "/partners" ||
              location.pathname.startsWith("/partners/") ||
              location.pathname.startsWith("/connect-profile") ||
              location.pathname.startsWith("/connected-profile")
            }
          />
        </div>
      </div>

      {/* Logout */}
      <div className="flex flex-col gap-2 pt-4">
        <SidebarItem
          icon={<LogoutIcon />}
          label="Log Out"
          to="/logout"
          danger
          active={location.pathname.startsWith("/logout")}
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
        ${
          active
            ? "bg-blue-50 text-blue-600 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        } 
        ${danger ? "hover:bg-red-200 text-red-600" : ""}`}
    >
      <div className="w-5 h-5">{icon}</div>
      <span>{label}</span>
    </Link>
  );
}

/* ================== SVG ICONS ================== */

function DashboardIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
    </svg>
  );
}

function PartnersIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V21h14v-4.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 2.08 1.97 3.45V21h6v-4.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zM20 3h-9v2h9v14h-9v2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z" />
    </svg>
  );
}
