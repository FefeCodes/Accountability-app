import { useState } from "react";
import { useNavigate } from "react-router-dom";
import accountabilityHero from "../assets/accountability-hero.svg";
import {
  signInWithGoogle,
  signInWithEmail,
  sendPasswordReset,
} from "../config/firebase";
import LoginCompt from "../components/LoginCompt";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserProfile } = useAuth();
  const { isDarkMode } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userData = await signInWithEmail(formData.email, formData.password);
      setUserProfile(userData);

      if (userData.onboardingCompleted) {
        navigate("/dashboard");
      } else {
        navigate(`/onboarding-step-${userData.onboardingStep || 1}`);
      }
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const userData = await signInWithGoogle();
      setUserProfile(userData);

      if (userData.onboardingCompleted) {
        navigate("/dashboard");
      } else {
        navigate(`/onboarding-step-${userData.onboardingStep || 1}`);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      console.error("Email is required for password reset");
      return;
    }

    try {
      await sendPasswordReset(formData.email);
    } catch (error) {
      console.error("Password Reset Error:", error);
    }
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col lg:flex-row justify-center items-center transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <div className="hidden lg:flex lg:w-1/2 h-screen items-center justify-center">
        <img
          className="w-full h-full"
          src={accountabilityHero}
          alt="Accountability Hero"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <LoginCompt
          formData={formData}
          onChange={handleChange}
          onSubmit={handleLogin}
          onGoogleLogin={handleGoogleLogin}
          onForgotPassword={handleForgotPassword}
          loading={loading}
        />
      </div>
    </div>
  );
}
