import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar.jsx";

export default function OnboardingFinal() {
  const totalSteps = 4;
  const currentStep = 4;

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center gap-y-16 bg-[#F5F7FA]">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <div className="w-1/2 p-15 bg-white rounded-3xl shadow-sm flex flex-col justify-center items-center gap-y-8">
        <img
          src={"/src/assets/confetti-ball.svg"}
          alt="confetti ball"
          className="w-12 h-12"
        />

        <h2 className="text-xl font-bold text-center">
          You are all set! 🎉 <br />
          We are finding the best accountability partner for you
        </h2>

        <div className="w-full flex justify-center items-center mt-4">
          <Link to="/dashboard">
            <button className="px-14 py-4 bg-[#3C91E6] text-white text-xl rounded-sm hover:bg-[#328ae1]">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
