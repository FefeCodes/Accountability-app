import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import Header from "../Header";
import SideBar from "../SideBar";
import UserProfileContent from "./profile/UserProfileContent";
import { getUserFromFirestoreSilent } from "../../config/firebase";

export default function UserProfile() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        const user = await getUserFromFirestoreSilent(currentUser.uid);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleUserDataUpdate = (updatedData) => {
    setUserData((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 z-30">
        <SideBar />
      </aside>

      <div
        className={`fixed inset-0 z-40 flex md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="flex-1 bg-black transition-opacity duration-300"
          style={{ opacity: isMobileMenuOpen ? 0.5 : 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`w-64 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <SideBar />
        </div>
      </div>

      <div className="flex flex-col flex-1 md:ml-64">
        <div className="fixed top-0 left-0 right-0 md:left-64 z-20">
          <Header
            title="My Profile"
            onMenuClick={() => setIsMobileMenuOpen(true)}
          />
        </div>
        <main className="mt-20 px-2 sm:px-4 sm:py-6 overflow-y-auto h-[calc(100vh-5rem)]">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : userData ? (
            <UserProfileContent
              userData={userData}
              onUserDataUpdate={handleUserDataUpdate}
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Failed to load profile data</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
