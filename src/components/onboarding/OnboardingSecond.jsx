import { useNavigate } from "react-router-dom";
import ProgressBar from "../atoms/ProgressBar.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { updateOnboardingProgress } from "../../config/firebase";
import { toast } from "react-toastify";

export default function OnboardingSecond() {
  const totalSteps = 5;
  const currentStep = 2;
  const navigate = useNavigate();
  const { currentUser, userProfile, setUserProfile } = useAuth();

  const [selectedGoal, setSelectedGoal] = useState(userProfile?.goal || "");
  const [customGoal, setCustomGoal] = useState(userProfile?.customGoal || "");
  const [loading, setLoading] = useState(false);

  const goals = [
    "Learning a new skill",
    "Building a project",
    "Fitness/Health",
    "Reading/Study",
    "Personal Growth",
    "Custom",
  ];

  useEffect(() => {
    if (userProfile) {
      setSelectedGoal(userProfile.goal || "");
      setCustomGoal(userProfile.customGoal || "");
    }
  }, [userProfile]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center gap-y-8 lg:gap-y-16 bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <h2 className="font-bold text-2xl lg:text-3xl text-gray-900">
        Your Goal
      </h2>

      <div className="w-full max-w-2xl p-6 lg:p-12 bg-white rounded-2xl shadow-xl flex flex-col justify-start items-start gap-y-6 lg:gap-y-8">
        <h2 className="text-2xl font-semibold">
          What do you want to stay accountable for?
        </h2>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {goals.map((goal) => (
            <button
              key={goal}
              onClick={() => setSelectedGoal(goal)}
              className={`px-4 py-4 rounded-xl border transition-colors cursor-pointer ${
                selectedGoal === goal
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              {goal}
            </button>
          ))}
        </div>

        {selectedGoal === "Custom" && (
          <div className="w-full mt-4">
            <input
              type="text"
              placeholder="Enter your custom goal..."
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              required={true}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        )}

        <div className="w-full flex gap-2 flex-wrap justify-between items-center">
          <button
            onClick={() => navigate("/onboarding-step-1")}
            className="w-full sm:w-auto px-6 py-3 text-blue-600 border border-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={async () => {
              if (
                !selectedGoal ||
                (selectedGoal === "Custom" && !customGoal.trim())
              ) {
                toast.error("Please select a goal or enter a custom goal");
                return;
              }

              setLoading(true);
              try {
                await updateOnboardingProgress(currentUser.uid, 3, {
                  goal: selectedGoal,
                  customGoal: selectedGoal === "Custom" ? customGoal : null,
                });

                setUserProfile((prev) => ({
                  ...prev,
                  goal: selectedGoal,
                  customGoal: selectedGoal === "Custom" ? customGoal : null,
                  onboardingStep: 3,
                }));

                toast.success("Goal saved!");
                navigate("/onboarding-step-3");
              } catch (error) {
                console.error("Error saving onboarding progress:", error);
                toast.error("Failed to save progress. Please try again.");
              } finally {
                setLoading(false);
              }
            }}
            disabled={
              loading ||
              !selectedGoal ||
              (selectedGoal === "Custom" && !customGoal.trim())
            }
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
