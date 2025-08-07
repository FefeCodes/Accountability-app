import googleIcon from "./assets/google-icon.svg";
import { Link } from "react-router-dom";

export default function SignupCompt({
  fullName,
  email,
  password,
  confirmPassword,
  onFullNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onGoogleSignup,
}) {
  return (
    <div className=" w-1/2 h-screen bg-white p-16  flex flex-col justify-center items-start">
      <h1 className="text-2xl font-bold pb-4 text-black">Welcome</h1>

      <div className="w-full h-auto flex flex-col justify-start items-start gap-y-2">
        <label className="text-l font-medium  text-black">Full Name</label>
        <input
          className="w-full h-auto border border-[#474646] rounded-md px-2 py-2.5 text-l font-regular text-[#545454]"
          type="text"
          placeholder="Enter your Full Name"
          value={fullName}
          onChange={onFullNameChange}
        />
      </div>

      <div className="w-full h-auto flex flex-col justify-start items-start gap-y-2">
        <label className="text-l font-medium  text-black">Email</label>
        <input
          className="w-full h-auto border border-[#474646] rounded-md px-2 py-2.5 text-l font-regular text-[#545454]"
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={onEmailChange}
        />
      </div>

      <div className="w-full h-auto flex flex-col justify-start items-start gap-y-2">
        <label className="text-l font-medium text-black">
          Choose Password
        </label>
        <input
          className="w-full h-auto border border-[#474646] rounded-md px-2 py-2.5 text-l font-regular text-[#545454]"
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={onPasswordChange}
        />
      </div>

      <div className="w-full h-auto flex flex-col justify-start items-start gap-y-2">
        <label className="text-l font-medium text-black">
          Confirm Password
        </label>
        <input
          className="w-full h-auto border border-[#474646] rounded-md px-2 py-2.5 text-l font-regular text-[#545454]"
          type="password"
          placeholder="Confirm your Password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
        />
      </div>

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
