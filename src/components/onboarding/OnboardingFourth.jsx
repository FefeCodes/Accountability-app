import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import ProgressBar from "../atoms/ProgressBar.jsx";
import Select from "../forms/Select.jsx";
import logo from "../../assets/logo.svg"
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { updateOnboardingProgress } from "../../config/firebase";

export default function OnboardingFourth() {
  const totalSteps = 5;
  const currentStep = 4;
  const navigate = useNavigate();
  const { currentUser, userProfile, setUserProfile } = useAuth();

  const [formData, setFormData] = useState({
    timezone: userProfile?.timezone || "",
    checkInTime: userProfile?.checkInTime || "",
    communicationMethod: userProfile?.communicationMethod || "",
  });
  const [loading, setLoading] = useState(false);

  const timezones = [
    "UTC (UTC+0)",
    "GMT (UTC+0)",
    "EST (UTC-5)",
    "CST (UTC-6)",
    "MST (UTC-7)",
    "PST (UTC-8)",
    "AST (UTC-4)",
    "AKST (UTC-9)",
    "HST (UTC-10)",
    "CET (UTC+1)",
    "EET (UTC+2)",
    "IST (UTC+5:30)",
    "JST (UTC+9)",
    "AEST (UTC+10)",
    "NZST (UTC+12)",
  ];

  const checkInTimes = [
    "Early Morning (6-8 AM)",
    "Morning (8-10 AM)",
    "Late Morning (10-12 PM)",
    "Early Afternoon (12-2 PM)",
    "Afternoon (2-4 PM)",
    "Late Afternoon (4-6 PM)",
    "Evening (6-8 PM)",
    "Late Evening (8-10 PM)",
  ];

  const communicationMethods = [
    "Email",
    "SMS",
    "Phone Calls",
    "WhatsApp",
    "Slack",
    "Discord",
  ];

  useEffect(() => {
    if (userProfile) {
      setFormData({
        timezone: userProfile.timezone || "",
        checkInTime: userProfile.checkInTime || "",
        communicationMethod: userProfile.communicationMethod || "",
      });
    }
  }, [userProfile]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center gap-y-8 lg:gap-y-10 bg-gradient-to-br from-blue-50 to-indigo-100">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <div className="fixed top-30 left-3/4 -translate-x-3/4 lg:left-20 lg:translate-x-0 z-50">
        <Link to="/">
          <img src={logo} alt="App Logo" className="h-10 w-auto" />
        </Link>
      </div>

      <h2 className="font-bold text-2xl lg:text-3xl text-gray-900">Availability & Preferences</h2>

      <div className="w-9/10 sm:w-full max-w-2xl p-5 py-8 sm:p-6 lg:p-12 bg-white rounded-2xl shadow-xl flex flex-col justify-start items-start gap-y-10 lg:gap-y-8">
        <div className="w-full h-auto flex flex-col gap-y-4">
          <Select
            label="Timezone"
            options={timezones}
            value={formData.timezone}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, timezone: value }))
            }
            required={true}
          />
          <Select
            label="Best Time to Check-in"
            options={checkInTimes}
            value={formData.checkInTime}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, checkInTime: value }))
            }
            required={true}
          />
          <Select
            label="Preferred Communication"
            options={communicationMethods}
            value={formData.communicationMethod}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, communicationMethod: value }))
            }
            required={true}
          />
        </div>

        <div className="w-full flex gap-2 flex-wrap justify-between items-center mt-6">
          <button
            onClick={() => navigate("/onboarding-step-3")}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-blue-600 border border-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={async () => {
              if (
                !formData.timezone ||
                !formData.checkInTime ||
                !formData.communicationMethod
              ) {
                alert("Please fill in all fields");
                return;
              }

              setLoading(true);
              try {
                await updateOnboardingProgress(currentUser.uid, 5, {
                  timezone: formData.timezone,
                  checkInTime: formData.checkInTime,
                  communicationMethod: formData.communicationMethod,
                });

                setUserProfile((prev) => ({
                  ...prev,
                  timezone: formData.timezone,
                  checkInTime: formData.checkInTime,
                  communicationMethod: formData.communicationMethod,
                  onboardingStep: 5,
                  onboardingCompleted: true,
                }));

                navigate("/onboarding-step-final");
              } catch (error) {
                console.error("Error saving onboarding progress:", error);
                alert("Failed to save progress. Please try again.");
              } finally {
                setLoading(false);
              }
            }}
            disabled={
              loading ||
              !formData.timezone ||
              !formData.checkInTime ||
              !formData.communicationMethod
            }
            className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Saving..." : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}
