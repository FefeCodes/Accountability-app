import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import InputField from "./forms/InputField.jsx";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (!oobCode) {
      toast.error("Invalid reset link. Please request a new password reset.");
      navigate("/login");
    }
  }, [oobCode, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, formData.password);
      toast.success(
        "Password reset successfully! You can now sign in with your new password."
      );
      navigate("/login");
    } catch (error) {
      console.error("Password reset error:", error);
      let errorMessage = "Failed to reset password. Please try again.";

      switch (error.code) {
        case "auth/expired-action-code":
          errorMessage =
            "Password reset link has expired. Please request a new one.";
          break;
        case "auth/invalid-action-code":
          errorMessage =
            "Invalid reset link. Please request a new password reset.";
          break;
        case "auth/weak-password":
          errorMessage =
            "Password is too weak. Please choose a stronger password.";
          break;
        default:
          errorMessage = "Failed to reset password. Please try again.";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!oobCode) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 lg:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600">Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="New Password"
            type="password"
            name="password"
            placeholder="Enter your new password"
            value={formData.password}
            onChange={handleChange}
            required={true}
          />

          <InputField
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required={true}
          />

          <button
            type="submit"
            disabled={
              loading || !formData.password || !formData.confirmPassword
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:text-blue-800 font-semibold transition-colors cursor-pointer"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
