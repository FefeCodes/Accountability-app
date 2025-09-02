import { useAuth } from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import myLogo from "../assets/logo.svg";
import { useTheme } from "../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";

export default function Dashboard() {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const dummyData = {
    currentStreak: 7,
    totalGoals: 3,
    completedTasks: 12,
    upcomingDeadlines: [
      {
        id: 1,
        title: "Complete React Course",
        dueDate: "2024-01-15",
        priority: "high",
      },
      {
        id: 2,
        title: "Gym Workout",
        dueDate: "2024-01-14",
        priority: "medium",
      },
      {
        id: 3,
        title: "Read Chapter 5",
        dueDate: "2024-01-16",
        priority: "low",
      },
    ],
    recentActivities: [
      { id: 1, action: "Completed React component", time: "2 hours ago" },
      { id: 2, action: "Logged workout session", time: "1 day ago" },
      { id: 3, action: "Set new goal", time: "2 days ago" },
    ],
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-[#F5F7FA]"
      }`}
    >
      {/* Header */}
      <header
        className={`transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 shadow-gray-900" : "bg-white shadow-sm"
        } border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={myLogo} alt="Logo" className="h-8 w-auto" />
              <h1
                className={`ml-3 text-xl font-semibold hidden sm:block ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Accountability App
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-2">
                {userProfile?.profilePicture ? (
                  <img
                    src={userProfile.profilePicture}
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {userProfile?.fullName?.charAt(0) ||
                        currentUser?.email?.charAt(0)}
                    </span>
                  </div>
                )}
                <span
                  className={`text-sm font-medium hidden sm:block ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {userProfile?.fullName || currentUser?.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2
            className={`text-xl sm:text-2xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome back, {userProfile?.fullName?.split(" ")[0] || "User"}!
          </h2>
          <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
            Keep up the great work on your accountability journey.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div
            className={`rounded-lg shadow p-6 transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Current Streak
                </p>
                <p
                  className={`text-2xl font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {dummyData.currentStreak} days
                </p>
              </div>
            </div>
          </div>

          <div
            className={`rounded-lg shadow p-6 transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Active Goals
                </p>
                <p
                  className={`text-2xl font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {dummyData.totalGoals}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`rounded-lg shadow p-6 transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Tasks Completed
                </p>
                <p
                  className={`text-2xl font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {dummyData.completedTasks}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Upcoming Deadlines */}
          <div
            className={`rounded-lg shadow transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div
              className={`px-6 py-4 border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-medium ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Upcoming Deadlines
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dummyData.upcomingDeadlines.map((deadline) => (
                  <div
                    key={deadline.id}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div>
                      <h4
                        className={`font-medium ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {deadline.title}
                      </h4>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Due: {deadline.dueDate}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        deadline.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : deadline.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {deadline.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div
            className={`rounded-lg shadow transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div
              className={`px-6 py-4 border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-medium ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Recent Activities
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dummyData.recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-3"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {activity.action}
                      </p>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
