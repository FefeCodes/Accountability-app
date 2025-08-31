import { Link } from "react-router-dom";
import InputField from "./InputField.jsx";
import ProgressBar from "./ProgressBar.jsx";
import { useState } from "react";

export default function Onboarding() {
  const totalSteps = 4;
  const currentStep = 1;

  const [formData, setFormData] = useState({
    username: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center gap-y-16 bg-[#F5F7FA]">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <h2 className="font-bold text-3xl">Basic Info</h2>
      <div className="w-1/2 p-15 bg-white rounded-3xl shadow-sm flex flex-col justify-start items-start gap-y-8">
        <div className="w-full flex flex-col gap-y-4">
          <InputField
            label="Username or Nickname"
            type="username"
            name="username"
            placeholder="Enter your username or nickname"
            value={formData.username}
            onChange={onChange}
          />
          <div className="w-full h-auto flex flex-col justify-start items-start pb-4">
            <p className="text-l font-medium text-black">Profile Picture</p>
            <div className="w-full h-auto flex flex-col justify-center items-center gap-y-2">
              <button className="w-fit h-auto px-16 py-3 text-[#3C91E6]">
                Take a Picture
              </button>
              <button className="w-fit h-auto px-16 py-3 border border-[#474646] rounded-sm">
                Upload file
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-center">
          <Link to="/onboarding-step-2">
            <button className="px-8 py-2.5 bg-[#3C91E6] text-white text-xl rounded-sm hover:bg-[#328ae1]">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
