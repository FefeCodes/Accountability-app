import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../../assets/arrow-left.svg";
import ConnectFirstContent from "./ConnectFirstContent";
import ConnectSecondContent from "./ConnectSecondContent";

export default function ConnectProfileMain({ partner }) {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* ✅ Fixed Back button only with sidebar offset + margins */}
      <div className="fixed top-20 md:top-26 left-0 right-0 z-10 px-4 pt-3 md:px-12 md:ml-64 md:w-[calc(100%-16rem)]">
        <button
          onClick={() => navigate("/partners")}
          className="w-full h-auto bg-white flex items-center gap-3 px-4 py-4 md:px-4 md:py-6 rounded-xl hover:bg-gray-50 transition"
        >
          <img src={ArrowLeft} alt="Go back" className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-900 hidden sm:block">
            Back to Partners
          </span>
        </button>
      </div>

      {/* ✅ Page Content with padding for top & sidebar offset */}
      <div className="pt-20 px-2 md:px-10 md:ml-64 space-y-4">
        <ConnectFirstContent partner={partner} />
        <ConnectSecondContent partner={partner} />
      </div>
    </div>
  );
}
