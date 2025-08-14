import googleIcon from "./assets/google-icon.svg";
import { Link } from "react-router-dom";
import InputField from "./InputField.jsx";

export default function SignupCompt({
  formData,
  onChange,
  onSubmit,
  onGoogleSignup,
}) {
  return (
    <div className=" w-1/2 h-screen bg-white p-16  flex flex-col justify-center items-start">
      <h1 className="text-2xl font-bold pb-4 text-black">Welcome</h1>

      <InputField 
      label="Full Name"
      type="text"
      name="fullName"
      placeholder="Enter your Full Name"
      value={formData.fullName}
      onChange={onChange}
      />

      <InputField 
      label="Email"
      type="email"
      name="email"
      placeholder="Enter your email"
      value={formData.email}
      onChange={onChange}
      />

      <InputField 
      label="Choose Password"
      type="password"
      name="password"
      placeholder="Enter your Password"
      value={formData.password}
      onChange={onChange}
      />

      <InputField 
      label="Confirm Password"
      type="password"
      name="confirmPassword"
      placeholder="Confirm your Password"
      value={formData.confirmPassword}
      onChange={onChange}
      />

      <div className="w-full h-auto flex flex-col justify-start items-start gap-y-2 mt-4 mb-1">
        <button
        className="w-full h-auto bg-[#3C91E6] rounded-md p-3 text-l font-medium text-white shadow-md"
        onClick={onSubmit}
      >
        Sign Up
      </button>

      <button
        className="w-full h-auto flex flex-row justify-center items-center gap-x-2 bg-white border rounded-md p-3 text-l font-medium shadow-md"
        onClick={onGoogleSignup}
      >
        <img className="w-5 h-6" src={googleIcon} alt={"Icon"} />
        Sign Up with Google
      </button>
      </div>

      <p className="self-center text-[#545454] font-medium">
        Already have an account?
        <Link to="/" className="text-[#3C91E6] font-medium">
          Log In
        </Link>
      </p>
    </div>
  );
}
