import googleIcon from "../assets/google-icon.svg";
import { Link } from "react-router-dom";
import InputField from "./forms/InputField.jsx";

export default function SignupCompt({
  formData,
  onChange,
  onSubmit,
  onGoogleSignup,
  loading = false,
}) {
  const canSubmit =
    formData.fullName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    !loading;

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Welcome
        </h1>
        <p className="text-gray-600">
          Create your account to start your accountability journey
        </p>
      </div>

      <InputField
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Enter your Full Name"
        value={formData.fullName}
        onChange={onChange}
        required={true}
      />

      <InputField
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={onChange}
        required={true}
      />

      <InputField
        label="Choose Password"
        type="password"
        name="password"
        placeholder="Enter your Password"
        value={formData.password}
        onChange={onChange}
        required={true}
      />

      <InputField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm your Password"
        value={formData.confirmPassword}
        onChange={onChange}
        required={true}
      />

      <div className="space-y-4 mt-6">
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <button
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          onClick={onGoogleSignup}
          type="button"
          disabled={loading}
        >
          <img className="w-5 h-5" src={googleIcon} alt="Google Icon" />
          Google
        </button>
      </div>

      <p className="text-center text-gray-600 mt-8">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors cursor-pointer"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
