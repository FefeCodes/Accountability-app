import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export default function FirstContent() {
  const { currentUser, userProfile } = useAuth();
  const [currentGoal, setCurrentGoal] = useState(null);

  // Fetch user's current goal from Firestore
  useEffect(() => {
    const fetchGoal = async () => {
      if (!currentUser) return;

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setCurrentGoal(data.currentGoal || null); // assumes you store currentGoal in Firestore
        }
      } catch (error) {
        console.error("Error fetching goal:", error);
      }
    };

    fetchGoal();
  }, [currentUser]);

  return (
    <div className="w-full">
      <div>
        <h2 className="text-2xl md:text-2xl font-semibold">
          Hi {userProfile?.username || "there"}, ready to crush some goals today?
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-[#545454] mt-2">
          <p className="font-light">Current Goal:</p>
          <p className="font-medium">
            {currentGoal ? currentGoal : "No active goal set"}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="w-full flex flex-col items-start gap-y-1 py-4 px-5 bg-[#FBFDFF] drop-shadow-sm border-l-4 border-l-[#3C91E6]">
          <p className="font-light text-sm">Total Partners</p>
          <p className="text-xl font-semibold">6</p>
        </div>

        <div className="w-full flex flex-col items-start gap-y-1 py-4 px-5 bg-[#F9FFFD] drop-shadow-sm border-l-4 border-l-[#00C48C]">
          <p className="font-light text-sm">Total Partner Groups</p>
          <p className="text-xl font-semibold">2</p>
        </div>

        <div className="w-full flex flex-col items-start gap-y-1 py-4 px-5 bg-[#FFFDF7] drop-shadow-sm border-l-4 border-l-[#F8BD00]">
          <p className="font-light text-sm">All Tasks</p>
          <p className="text-xl font-semibold">10</p>
        </div>

        <div className="w-full flex flex-col items-start gap-y-1 py-4 px-5 bg-[#FAF6FF] drop-shadow-sm border-l-4 border-l-[#8A38F5]">
          <p className="font-light text-sm">Task Done</p>
          <p className="text-xl font-semibold">6</p>
        </div>
      </div>
    </div>
  );
}
