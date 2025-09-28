import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ProgressBar from "../atoms/ProgressBar.jsx";
import logo from "../../assets/logo.svg";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { updateOnboardingProgress } from "../../config/firebase";
import { toast } from "react-toastify";

export default function OnboardingThird() {
  const totalSteps = 5;
  const currentStep = 2;
  const navigate = useNavigate();
  const { currentUser, userProfile, setUserProfile } = useAuth();

  const [selectedStyles, setSelectedStyles] = useState(
    userProfile?.styles || []
  );
  const [oneOnOne, setOneOnOne] = useState(userProfile?.oneOnOne || false);
  const [smallGroups, setSmallGroups] = useState(
    userProfile?.smallGroups || false
  );
  const [loading, setLoading] = useState(false);

  const styles = [
    "Gentle Reminders",
    "Daily Check-ins",
    "Weekly Reviews",
    "Strict 'no excuses' mode",
  ];

  useEffect(() => {
    if (userProfile) {
      setSelectedStyles(userProfile.styles || []);
      setOneOnOne(userProfile.oneOnOne || false);
      setSmallGroups(userProfile.smallGroups || false);
    }
  }, [userProfile]);

  const handleStyleClick = (style) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  return (
    <main
      className="w-full min-h-screen flex flex-col justify-start items-center gap-y-6 lg:gap-y-10 bg-gradient-to-br from-blue-50 to-indigo-100"
      role="main"
      aria-labelledby="onboarding-style-heading"
    >
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {/* Mobile: centered logo */}
      <div className=" lg:hidden w-full flex justify-center pt-4">
        <Link to="/">
          <img src={logo} alt="App Logo" className="h-10 w-10" />
        </Link>
      </div>
      {/* Desktop: top-left logo */}
      <div className="hidden lg:flex lg:fixed lg:top-25 lg:left-6 z-50">
        <Link to="/">
          <img src={logo} alt="App Logo" className="h-10 w-10" />
        </Link>
      </div>

      <h2
        id="onboarding-style-heading"
        className="font-bold text-2xl lg:text-3xl text-gray-900"
      >
        Your Style
      </h2>

      <section
        className="w-9/10 sm:w-full max-w-2xl p-5 py-8 sm:p-6 lg:p-12 bg-white rounded-2xl shadow-xl flex flex-col justify-start items-start gap-y-7 lg:gap-y-8"
        aria-labelledby="style-question"
      >
        <h2 id="style-question" className="text-xl font-semibold">
          What styles keep you accountable?
        </h2>

        {/* Style Selection */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => handleStyleClick(style)}
              className={`px-4 py-4 rounded-xl border transition-colors cursor-pointer ${
                selectedStyles.includes(style)
                  ? "bg-blue-600 text-white border-blue-600 sm:text-base text-sm"
                  : "bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 sm:text-base text-sm"
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        {/* Toggle Sliders (right-aligned) */}
        <div className="w-full flex flex-col items-end justify-end gap-6 mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-gray-800 font-light text-sm">
              Prefer one-on-one partner
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={oneOnOne}
                onChange={() => setOneOnOne(!oneOnOne)}
                className="sr-only"
              />
              <div
                className={`block w-10 h-5 rounded-full transition ${
                  oneOnOne ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`dot absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition ${
                  oneOnOne ? "translate-x-5" : ""
                }`}
              ></div>
            </div>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-gray-800 font-light text-sm">
              Open to small groups
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={smallGroups}
                onChange={() => setSmallGroups(!smallGroups)}
                className="sr-only"
              />
              <div
                className={`block w-10 h-5 rounded-full transition ${
                  smallGroups ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`dot absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition ${
                  smallGroups ? "translate-x-5" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>

        {/* Navigation Buttons */}
        <div className="w-full flex gap-2 flex-wrap justify-between items-center mt-6">
          <button
            onClick={() => navigate("/onboarding-step-2")}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-blue-600 border border-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={async () => {
              if (selectedStyles.length === 0) {
                toast.error("Please select at least one style");
                return;
              }

              setLoading(true);
              try {
                await updateOnboardingProgress(currentUser.uid, 3, {
                  styles: selectedStyles,
                  oneOnOne,
                  smallGroups,
                });

                setUserProfile((prev) => ({
                  ...prev,
                  styles: selectedStyles,
                  oneOnOne,
                  smallGroups,
                  onboardingStep: 3,
                }));

                toast.success("Style saved!");
                navigate("/onboarding-step-4");
              } catch (error) {
                console.error("Error saving onboarding progress:", error);
                toast.error("Failed to save progress. Please try again.");
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading || selectedStyles.length === 0}
            className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      </section>
    </main>
  );
}
