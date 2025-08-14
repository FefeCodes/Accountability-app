import googleIcon from "./assets/google-icon.svg";
import { Link } from "react-router-dom";
import InputField from "./InputField.jsx";

export default function LoginCompt({
  formData,
  onChange,
  onSubmit,
  onGoogleLogin,
}) {
  return (
    <div className=" w-1/2 h-screen bg-white p-16  flex flex-col justify-center items-start">
      <h1 className="text-2xl font-bold pb-4 text-black">Welcome back</h1>

      <InputField 
      label="Email"
      type="email"
      name="email"
      placeholder="Enter your Email"
      value={formData.email}
      onChange={onChange}
      />

      <InputField 
      label="Password"
      type="password"
      name="password"
      placeholder="Enter your Password"
      value={formData.password}
      onChange={onChange}
      />

      <div className="justify-self-end self-end mb-6 text-[#FF3A3A]">
        <a className="text-lg font-medium" href="#">
          Forgot password
        </a>
      </div>

      <div className="w-full h-auto flex flex-col justify-start items-start gap-y-2 mt-4 mb-1">
        <button
        className="w-full h-auto bg-[#3C91E6] rounded-md p-3 text-l font-medium text-white shadow-md"
        onClick={onSubmit}
      >
        Log In
      </button>

      <button
        className="w-full h-auto flex flex-row justify-center items-center gap-x-2 bg-white border rounded-md p-3 text-l font-medium shadow-md"
        onClick={onGoogleLogin}
      >
        <img className="w-5 h-6" src={googleIcon} alt="Google Icon" />
        Log In with Google
      </button>
      </div>

      <p className="justify-self-center self-center text-[#545454] font-medium">
        Don't have an account?{" "}
        <Link to="/signup" className="text-[#3C91E6] font-medium">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
