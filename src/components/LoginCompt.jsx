import googleIcon from "../assets/google-icon.svg";
import { Link } from "react-router-dom";
import InputField from "./forms/InputField.jsx";
import { useState, useEffect } from "react";

export default function LoginCompt({
  formData,
  onChange,
  onSubmit,
  onGoogleLogin,
  onForgotPassword,
  loading = false,
}) {
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const canSubmit =
    formData.email &&
    formData.password &&
    isPasswordValid && // ✅ only allow submit if valid
    !loading;

  // ✅ Password Validation Logic
  useEffect(() => {
    const errors = [];
    const password = formData.password;

    if (!password) {
      setPasswordErrors([]);
      setIsPasswordValid(false);
      return;
    }

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }

    setPasswordErrors(errors);
    setIsPasswordValid(errors.length === 0);
  }, [formData.password]);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col justify-center gap-y-1">
      <div className="text-center flex flex-col gap-y-1 mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
          Welcome back
        </h1>
        <p className="text-gray-600">
          Sign in to continue your accountability journey
        </p>
      </div>

      <InputField
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your Email"
        value={formData.email}
        onChange={onChange}
        required={true}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your Password"
        value={formData.password}
        onChange={onChange}
        required={true}
      />

      {/* ❌ Show errors if invalid */}
      {formData.password && passwordErrors.length > 0 && (
        <ul className="mt-2 mb-2 text-sm text-red-500 space-y-1">
          {passwordErrors.map((err, idx) => (
            <li key={idx}>• {err}</li>
          ))}
        </ul>
      )}

      {/* ✅ Show success if valid */}
      {formData.password && isPasswordValid && (
        <p className="mt-2 mb-2 text-sm text-green-600 font-medium">
          ✅ Strong password
        </p>
      )}

      <div className="flex justify-end mb-6">
        <button
          onClick={onForgotPassword}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        >
          Forgot password?
        </button>
      </div>

      <div className="space-y-4 mt-1">
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          onClick={onSubmit}
          type="button"
          disabled={!canSubmit}
        >
          {loading ? "Signing In..." : "Sign In"}
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
          onClick={onGoogleLogin}
          type="button"
          disabled={loading}
        >
          <img className="w-5 h-5" src={googleIcon} alt="Google Icon" />
          Google
        </button>
      </div>

      <p className="text-center text-gray-600 mt-1">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors cursor-pointer"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
