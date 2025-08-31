import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar.jsx";

export default function OnboardingSecond() {
  const totalSteps = 4;
  const currentStep = 2;

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center gap-y-16 bg-[#F5F7FA]">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <h2 className="font-bold text-3xl">Your Goal</h2>

      <div className="w-1/2 p-15 bg-white rounded-3xl shadow-sm flex flex-col justify-start items-start gap-y-8">
        <h2 className="text-2xl font-semibold">
          What do you want to stay accountable for?
        </h2>

        <div className="w-full h-auto grid grid-cols-3 gap-4">
          <button className="px-4 py-4 bg-white rounded-xl border border-[#474646]">
            Learning a new skill
          </button>
          <button className="px-4 py-4 bg-white rounded-xl border border-[#474646]">
            Building a project
          </button>
          <button className="px-4 py-4 bg-white rounded-xl border border-[#474646]">
            Fitness/Health
          </button>
          <button className="px-4 py-4 bg-white rounded-xl border border-[#474646]">
            Reading/Study
          </button>
          <button className="px-4 py-4 bg-white rounded-xl border border-[#474646]">
            Personal Growth
          </button>
          <button className="px-4 py-4 bg-white rounded-xl border border-[#474646]">
            Custom
          </button>
        </div>

        <div className="w-full flex justify-end items-center">
          <Link to="/onboarding-step-3">
            <button className="px-8 py-2.5 bg-[#3C91E6] text-white text-xl rounded-sm hover:bg-[#328ae1]">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
