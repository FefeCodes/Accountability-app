import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar";
import logOutIcon from "../../assets/light_logout.svg";

export default function LogOut() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:block h-screen">
        <SideBar />
      </aside>

      <main
        className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gray-50 p-16"
        role="main"
      >
        <div className="bg-white rounded-xl shadow-sm px-20 py-12 w-full max-w-md text-center">
          <div className="flex flex-row justify-center items-center gap-2 mb-8">
            <img src={logOutIcon} alt="Log Out" className="w-12 h-12" />
            <h2 className="text-3xl font-semibold text-gray-800">Log Out</h2>
          </div>

          <p className="text-gray-600 text-xl mb-10">
            Are you sure you want to log out?
          </p>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 rounded-lg border bg-red-600 text-white hover:bg-red-500 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className=
              "px-8 py-4 rounded-lg border border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
