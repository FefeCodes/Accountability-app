import { useNavigate } from "react-router-dom";
import ProgressBar from "../atoms/ProgressBar.jsx";
import Select from "../forms/Select.jsx";
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
    <div className="w-full h-screen flex flex-col justify-start items-center gap-y-16 bg-[#F5F7FA]">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <h2 className="font-bold text-3xl">Availability & Preferences</h2>

      <div className="w-1/2 p-15 bg-white rounded-3xl shadow-sm flex flex-col justify-start items-start gap-y-8">
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

        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => navigate("/onboarding-step-3")}
            className="px-8 py-2.5 text-[#3C91E6] border border-[#3C91E6] text-xl rounded-sm hover:bg-[#3C91E6] hover:text-white transition-colors"
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
            className="px-8 py-2.5 bg-[#3C91E6] text-white text-xl rounded-sm hover:bg-[#328ae1] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}
