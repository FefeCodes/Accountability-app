import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../../assets/arrow-left.svg";
import ConnectedFirstContent from "./ConnectedFirstContent";
import ConnectedSecondContent from "./ConnectedSecondContent";

export default function ConnectedProfileMain({ partner }) {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="fixed top-20 md:top-26 left-0 right-0 z-10 px-8 md:px-12 md:ml-64 md:w-[calc(100%-16rem)]">
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

      <div className="pt-45 px-8 md:px-10 md:ml-64 space-y-6">
        <ConnectedFirstContent partner={partner} />
        <ConnectedSecondContent partner={partner} />
      </div>
    </div>
  );
}
