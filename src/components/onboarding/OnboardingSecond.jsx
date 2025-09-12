import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import ProgressBar from "../atoms/ProgressBar.jsx";
import logo from "../../assets/logo.svg"
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { updateOnboardingProgress } from "../../config/firebase";
import { toast } from "react-toastify";

export default function OnboardingSecond() {
  const totalSteps = 5;
  const currentStep = 2;
  const navigate = useNavigate();
  const { currentUser, userProfile, setUserProfile } = useAuth();

  const [selectedGoals, setSelectedGoals] = useState(userProfile?.goals || []);
  const [customGoal, setCustomGoal] = useState("");
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
      setSelectedGoals(userProfile.goals || []);
      setCustomGoal(userProfile.customGoal || "");
    }
  }, [userProfile]);

  // toggle goal selection
const toggleGoal = (goal) => {
  if (selectedGoals.includes(goal)) {
    // remove if already selected
    setSelectedGoals(selectedGoals.filter((g) => g !== goal));

    // also clear customGoal if "Custom" is removed
    if (goal === "Custom") {
      setCustomGoal("");
    }
  } else {
    // add if not selected
    setSelectedGoals([...selectedGoals, goal]);
  }
};


  const handleNext = async () => {
    if (selectedGoals.length === 0) {
      toast.error("Please select at least one goal");
      return;
    }
    if (selectedGoals.includes("Custom") && !customGoal.trim()) {
      toast.error("Please enter your custom goal");
      return;
    }

    setLoading(true);
    try {
      await updateOnboardingProgress(currentUser.uid, 3, {
        goals: selectedGoals,
        customGoal: selectedGoals.includes("Custom") ? customGoal : null,
      });

      setUserProfile((prev) => ({
        ...prev,
        goals: selectedGoals,
        customGoal: selectedGoals.includes("Custom") ? customGoal : null,
        onboardingStep: 3,
      }));

      toast.success("Goals saved!");
      navigate("/onboarding-step-3");
    } catch (error) {
      console.error("Error saving onboarding progress:", error);
      toast.error("Failed to save progress. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center gap-y-8 lg:gap-y-10 bg-gradient-to-br from-blue-50 to-indigo-100" role="main" aria-labelledby="onboarding-goal-heading">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <div className="fixed top-30 left-3/4 -translate-x-3/4 lg:left-20 lg:translate-x-0 z-50">
        <Link to="/">
          <img src={logo} alt="App Logo" className="h-10 w-auto" />
        </Link>
      </div>

      <h2 id="onboarding-goal-heading" className="font-bold text-2xl lg:text-3xl text-gray-900">
        Your Goals
      </h2>

      <section className="w-9/10 sm:w-full max-w-2xl p-5 py-8 sm:p-6 lg:p-12 bg-white rounded-2xl shadow-xl flex flex-col justify-start items-start gap-y-10 lg:gap-y-8" aria-labelledby="goal-question">
        <h2 id="goal-question" className="text-xl font-semibold">
          What do you want to stay accountable for?
        </h2>

        <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {goals.map((goal) => (
            <button
              key={goal}
              onClick={() => toggleGoal(goal)}
              className={`px-4 py-4 rounded-xl border transition-colors cursor-pointer ${
                selectedGoals.includes(goal)
                  ? "bg-blue-600 text-white border-blue-600 sm:text-base text-sm"
                  : "bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 sm:text-base text-sm"
              }`}
            >
              {goal}
            </button>
          ))}
        </div>

        {selectedGoals.includes("Custom") && (
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
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-blue-600 border border-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={
              loading ||
              selectedGoals.length === 0 ||
              (selectedGoals.includes("Custom") && !customGoal.trim())
            }
            className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      </section>
    </main>
  );
}
