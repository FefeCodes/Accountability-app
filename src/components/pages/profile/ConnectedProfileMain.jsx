import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../../assets/arrow-left.svg";
import ConnectedFirstContent from "./ConnectedFirstContent";
import ConnectedSecondContent from "./ConnectedSecondContent";

export default function ConnectedProfileMain() {
    const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
        <div className="fixed top-20 md:top-24 left-0 right-0 md:left-50 z-10 bg-gray-100">
                <div className="max-w-4xl mx-auto mt-2">
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
              </div>

    <div className="pt-20 md:pt-52 space-y-6">
      <ConnectedFirstContent />
      <ConnectedSecondContent />
    </div>
    </div>
  );
}
