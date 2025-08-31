import { useNavigate } from "react-router-dom";
import arrowLeft from "../../assets/arrow-left.svg";

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;
  const navigate = useNavigate();

  const handleBack = () => {
    if (currentStep > 1) {
      navigate(`/onboarding-step-${currentStep - 1}`);
    }
  };

  return (
    <div className="w-full p-4 flex flex-row justify-start items-center gap-x-4 lg:gap-x-10 bg-white shadow-sm">
      <button
        onClick={handleBack}
        disabled={currentStep <= 1}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img src={arrowLeft} alt="Back" className="w-6 h-6 lg:w-8 lg:h-8" />
      </button>
      <div className="flex-1 bg-gray-200 rounded-full h-2 lg:h-3">
        <div
          className="bg-green-500 h-2 lg:h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="text-sm lg:text-base font-medium text-gray-600">
        {currentStep} of {totalSteps}
      </span>
    </div>
  );
}
