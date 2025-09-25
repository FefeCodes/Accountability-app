import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { updateUserProfile } from "../../../config/firebase";
import { showSuccessToast } from "../../../utils/errorHandler";
import ProfileBasicInfo from "./ProfileBasicInfo";
import ProfileGoals from "./ProfileGoals";
import ProfileTasks from "./ProfileTasks";
import ProfileInterests from "./ProfileInterests";
import ProfileContactInfo from "./ProfileContactInfo";
import ProfilePicture from "./ProfilePicture";

export default function UserProfileContent({ userData, onUserDataUpdate }) {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: "basic", label: "Basic Info", icon: "👤" },
    { id: "goals", label: "Goals", icon: "🎯" },
    { id: "tasks", label: "Tasks", icon: "📋" },
    { id: "interests", label: "Interests", icon: "⭐" },
    { id: "contact", label: "Contact", icon: "📞" },
    { id: "picture", label: "Profile Picture", icon: "📷" },
  ];

  const handleUpdate = async (updateData) => {
    if (!currentUser) return;

    try {
      setLoading(true);
      await updateUserProfile(currentUser.uid, updateData);
      onUserDataUpdate(updateData);
      showSuccessToast("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <ProfileBasicInfo
            userData={userData}
            onUpdate={handleUpdate}
            loading={loading}
          />
        );
      case "goals":
        return (
          <ProfileGoals
            userData={userData}
            onUpdate={handleUpdate}
            loading={loading}
          />
        );
      case "tasks":
        return (
          <ProfileTasks
            userData={userData}
            onUpdate={handleUpdate}
            loading={loading}
          />
        );
      case "interests":
        return (
          <ProfileInterests
            userData={userData}
            onUpdate={handleUpdate}
            loading={loading}
          />
        );
      case "contact":
        return (
          <ProfileContactInfo
            userData={userData}
            onUpdate={handleUpdate}
            loading={loading}
          />
        );
      case "picture":
        return (
          <ProfilePicture
            userData={userData}
            onUpdate={handleUpdate}
            loading={loading}
          />
        );
      default:
        return (
          <ProfileBasicInfo
            userData={userData}
            onUpdate={handleUpdate}
            loading={loading}
          />
        );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
            <img
              src={userData.profilePicture || "/default-avatar.png"}
              alt={userData.fullName || "User"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {userData.fullName || "User"}
            </h1>
            <p className="text-gray-600 mb-1">{userData.email}</p>
            <p className="text-sm text-gray-500">
              Member since {new Date(userData.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
}
