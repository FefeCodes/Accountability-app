import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { getDashboardStats, seedUserData } from "../../../utils/firebaseData";

export default function FirstContent() {
  const { currentUser, userProfile } = useAuth();
  const [stats, setStats] = useState({
    totalPartners: 0,
    connectedPartners: 0,
    totalTasks: 0,
    completedTasks: 0,
    activeGoals: 0,
    currentGoal: "No active goal set",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);

        try {
          await seedUserData(currentUser.uid);
        } catch (seedError) {
          console.warn("Could not seed user data:", seedError);
        }

        const dashboardStats = await getDashboardStats(currentUser.uid);

        // normalize with defaults
        setStats({
          totalPartners: dashboardStats.totalPartners ?? 0,
          connectedPartners: dashboardStats.connectedPartners ?? 0,
          totalTasks: dashboardStats.totalTasks ?? 0,
          completedTasks: dashboardStats.completedTasks ?? 0,
          activeGoals: dashboardStats.activeGoals ?? 0,
          currentGoal: dashboardStats.currentGoal || "No active goal set",
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div>
        <h2 className="text-2xl md:text-2xl font-semibold">
          Hi {userProfile?.username || "there"}, ready to crush some goals
          today?
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-[#545454] mt-2">
          <p className="font-light">Current Goal:</p>
          <p className="font-medium">{stats.currentGoal}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="w-full flex flex-col items-start gap-y-1 py-4 px-5 bg-[#FBFDFF] drop-shadow-sm border-l-4 border-l-[#3C91E6]">
          <p className="font-light text-sm">Total Partners</p>
          <p className="text-xl font-semibold">{stats.totalPartners}</p>
        </div>

        <div className="w-full flex flex-col items-start gap-y-1 py-4 px-5 bg-[#F9FFFD] drop-shadow-sm border-l-4 border-l-[#00C48C]">
          <p className="font-light text-sm">Connected Partners</p>
          <p className="text-xl font-semibold">{stats.connectedPartners}</p>
        </div>

        <div className="w-full flex flex-col items-start gap-y-1 py-4 px-5 bg-[#FFFDF7] drop-shadow-sm border-l-4 border-l-[#F8BD00]">
          <p className="font-light text-sm">All Tasks</p>
          <p className="text-xl font-semibold">{stats.totalTasks}</p>
        </div>

        <div className="w-full flex flex-col items-start gap-y-1 py-4 px-5 bg-[#FAF6FF] drop-shadow-sm border-l-4 border-l-[#8A38F5]">
          <p className="font-light text-sm">Tasks Done</p>
          <p className="text-xl font-semibold">{stats.completedTasks}</p>
        </div>
      </div>
    </div>
  );
}
