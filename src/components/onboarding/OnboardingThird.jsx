import { useNavigate } from "react-router-dom";
import ProgressBar from "../atoms/ProgressBar.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { updateOnboardingProgress } from "../../config/firebase";

export default function OnboardingThird() {
  const totalSteps = 5;
  const currentStep = 3;
  const navigate = useNavigate();
  const { currentUser, userProfile, setUserProfile } = useAuth();

  const [selectedStyle, setSelectedStyle] = useState(userProfile?.accountabilityStyle || "");
  const [loading, setLoading] = useState(false);

  const accountabilityStyles = [
    "Gentle Reminders",
    "Daily Check-ins", 
    "Weekly Reviews",
    "Strict \"no excuses\" mode"
  ];

  useEffect(() => {
    if (userProfile) {
      setSelectedStyle(userProfile.accountabilityStyle || "");
    }
  }, [userProfile]);

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center gap-y-16 bg-[#F5F7FA]">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <h2 className="font-bold text-3xl">Accountability Syle</h2>

      <div className="w-1/2 p-15 bg-white rounded-3xl shadow-sm flex flex-col justify-start items-start gap-y-8">
        <h2 className="text-2xl font-semibold">
          How do you want your partner to keep you accountable?
        </h2>

        <div className="w-full h-auto grid grid-cols-2 gap-4">
          {accountabilityStyles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`px-4 py-4 rounded-xl border transition-colors ${
                selectedStyle === style
                  ? "bg-[#3C91E6] text-white border-[#3C91E6]"
                  : "bg-white border-[#474646] hover:bg-gray-50"
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => navigate("/onboarding-step-2")}
            className="px-8 py-2.5 text-[#3C91E6] border border-[#3C91E6] text-xl rounded-sm hover:bg-[#3C91E6] hover:text-white transition-colors"
          >
            Back
          </button>
          <button
            onClick={async () => {
              if (!selectedStyle) {
                alert("Please select an accountability style");
                return;
              }

              setLoading(true);
              try {
                await updateOnboardingProgress(currentUser.uid, 4, {
                  accountabilityStyle: selectedStyle,
                });
                
                setUserProfile(prev => ({
                  ...prev,
                  accountabilityStyle: selectedStyle,
                  onboardingStep: 4,
                }));
                
                navigate("/onboarding-step-4");
              } catch (error) {
                console.error("Error saving onboarding progress:", error);
                alert("Failed to save progress. Please try again.");
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading || !selectedStyle}
            className="px-8 py-2.5 bg-[#3C91E6] text-white text-xl rounded-sm hover:bg-[#328ae1] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
