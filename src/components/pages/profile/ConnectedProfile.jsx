import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Header";
import SideBar from "../../SideBar";
import ConnectedProfileMain from "./ConnectedProfileMain";
import { getUserFromFirestoreSilent } from "../../../config/firebase";

export default function ConnectedProfile() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const { partnerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartner = async () => {
      if (!partnerId) {
        navigate("/partners");
        return;
      }

      try {
        setLoading(true);
        const userData = await getUserFromFirestoreSilent(partnerId);
        if (userData) {
          setPartner(userData);
        } else {
          navigate("/partners");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/partners");
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, [partnerId, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-white shadow-md z-30">
        <SideBar />
      </aside>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="w-64 bg-white h-full shadow-xl">
            <SideBar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 md:ml-64">
        <div className="fixed top-0 left-0 right-0 md:left-64 z-20 bg-white shadow-sm">
          <Header
            title="Partners"
            onMenuClick={() => setIsMobileMenuOpen(true)}
          />
        </div>
        <main className="mt-20 px-2 sm:py-2 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : partner ? (
            <ConnectedProfileMain partner={partner} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">User not found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
