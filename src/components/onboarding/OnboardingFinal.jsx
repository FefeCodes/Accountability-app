import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import ProgressBar from "../atoms/ProgressBar.jsx";
import confettiBall from "../../assets/confetti-ball.svg";
import logo from "../../assets/logo.svg"
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
    <div className="w-full min-h-screen flex flex-col justify-start items-center gap-y-6 lg:gap-y-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {/* Mobile: centered logo */}
      <div className="lg:hidden w-full flex justify-center pt-4">
        <Link to="/">
          <img src={logo} alt="App Logo" className="h-10 w-10" />
        </Link>
      </div>
      {/* Desktop: top-left logo */}
      <div className="hidden lg:flex lg:fixed lg:top-4 lg:left-6 z-50">
        <Link to="/">
          <img src={logo} alt="App Logo" className="h-10 w-10" />
        </Link>
      </div>

      <div className="w-9/10 md:w-full max-w-2xl p-6 lg:p-12 bg-white rounded-2xl shadow-xl flex flex-col justify-center items-center gap-y-7 lg:gap-y-8 mt-10 md:mt-20">
        <img
          src={confettiBall}
          alt="confetti ball"
          className="w-16 h-16 lg:w-20 lg:h-20"
        />

        <h2 className="text-xl lg:text-2xl font-bold md:font-semibold text-center text-gray-900">
          You are all set! 🎉 <br />
          We are finding the best accountability partner for you
        </h2>

        <div className="w-full mt-4">
          <button
            onClick={handleGoToDashboard}
            className="w-full sm:w-full flex flex-row justify-center items-center gap-x-2 px-6 sm:px-10 py-3 sm:py-5 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          >
            Go to Dashboard
            <svg
                className="ml-2 w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
