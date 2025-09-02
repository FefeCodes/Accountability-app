import { useNavigate } from "react-router-dom";
import ArrowLeft from "../assets/arrow-left.svg";
import ConnectedFirstContent from "./ConnectedFirstContent";
import ConnectedSecondContent from "./ConnectedSecondContent";
import Header from "./Header";
import SideBar from "./SideBar";

export default function ConnectedProfile() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
     
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-white shadow-md fixed h-full">
        <SideBar />
      </aside>

      
      <div className="flex-1 md:ml-64 lg:ml-72 flex flex-col">
        
        <Header title="Partners" showSearch={true} showAdd={false} />

        
        <div className="sticky top-16 z-10 w-full h-16 mt-4 ml-5 px-4 md:px-6 flex items-center justify-between bg-white shadow-sm rounded-lg">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 transition m"
          >
            <img src={ArrowLeft} alt="Go back" className="w-6 h-6" />
          </button>
        </div>

        
        <main className="flex-1 overflow-auto p-4 md:p-6 space-y-6 mt-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <ConnectedFirstContent />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <ConnectedSecondContent />
          </div>
        </main>
      </div>
    </div>
  );
}
