import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar.jsx";
import Select from "./Select.jsx";

export default function OnboardingFourth() {
  const totalSteps = 4;
  const currentStep = 4;

  const timezone = ["GMT", "UTC", "EST", "CST", "MST", "PST"];
  const checkInTimes = ["Morning", "Afternoon", "Evening"];
  const communicationMethods = [
    "Email",
    "SMS",
    "App Notifications",
    "Phone Calls",
  ];

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center gap-y-16 bg-[#F5F7FA]">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <h2 className="font-bold text-3xl">Availability & Preferences</h2>

      <div className="w-1/2 p-15 bg-white rounded-3xl shadow-sm flex flex-col justify-start items-start gap-y-8">
        <div className="w-full h-auto flex flex-col gap-y-4">
          <Select label="Timezone" options={timezone} />
          <Select label="Best Time to Check-in" options={checkInTimes} />
          <Select
            label="Preferred Communication"
            options={communicationMethods}
          />
        </div>

        <div className="w-full flex justify-end items-center">
          <Link to="/onboarding-step-final">
            <button className="px-8 py-2.5 bg-[#3C91E6] text-white text-xl rounded-sm hover:bg-[#328ae1]">
              Finish
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
