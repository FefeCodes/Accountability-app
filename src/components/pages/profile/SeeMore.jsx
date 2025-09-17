import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../../assets/arrow-left.svg";
import SeeMoreContent from "./SeeMoreContent";
import Header from "../../Header";
import SideBar from "../../SideBar";

export default function SeeMore() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar (fixed) */}
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-white shadow-md z-30">
        <SideBar />
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Fixed header */}
        <div className="fixed top-0 left-0 right-0 md:left-64 z-20 bg-white shadow-sm">
          <Header title="Partners" showSearch={true} showAdd={false} />
        </div>

        {/* Fixed back button bar */}
        <div className="w-full px-2 sm:py-2 overflow-y-auto">
          <div className="fixed top-20 md:top-26 left-0 right-0 z-10 px-8 md:px-12 md:ml-64 md:w-[calc(100%-16rem)]">
            <button
              onClick={() => navigate("/connected-profile")}
              className="w-full h-auto bg-white flex items-center gap-3 px-4 py-4 md:px-4 md:py-6 rounded-xl hover:bg-gray-50 transition"
            >
              <img src={ArrowLeft} alt="Go back" className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-900 hidden sm:block">
                Back
              </span>
            </button>
          </div>
        </div>

        {/* Scrollable content */}
            <div className="pt-45 px-8 md:px-12 space-y-6">
              <SeeMoreContent />
            </div>
      </div>
    </div>
  );
}
