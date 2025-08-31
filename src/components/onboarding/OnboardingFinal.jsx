import { useNavigate } from "react-router-dom";
import ProgressBar from "../atoms/ProgressBar.jsx";
import confettiBall from "../../assets/confetti-ball.svg";
import { toast } from "react-toastify";

export default function OnboardingFinal() {
  const totalSteps = 5;
  const currentStep = 5;
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    toast.success("Welcome to your accountability journey! 🎉");
    navigate("/dashboard");
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center gap-y-8 lg:gap-y-16 bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <div className="w-full max-w-2xl p-6 lg:p-12 bg-white rounded-2xl shadow-xl flex flex-col justify-center items-center gap-y-6 lg:gap-y-8">
        <img
          src={confettiBall}
          alt="confetti ball"
          className="w-16 h-16 lg:w-20 lg:h-20"
        />

        <h2 className="text-xl lg:text-2xl font-bold text-center text-gray-900">
          You are all set! 🎉 <br />
          We are finding the best accountability partner for you
        </h2>

        <div className="w-full flex justify-center items-center mt-4">
          <button
            onClick={handleGoToDashboard}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
