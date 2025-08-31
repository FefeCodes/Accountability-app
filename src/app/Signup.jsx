import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupCompt from "../components/SignupCompt";
import accountabilityHero from "../assets/accountability-hero.svg";
import { signUpWithEmail, signInWithGoogle } from "../config/firebase";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { showErrorToast } from "../utils/errorHandler";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserProfile } = useAuth();
  const { isDarkMode } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      showErrorToast({ message: "Passwords do not match" });
      return;
    }

    setLoading(true);
    try {
      const userData = await signUpWithEmail(
        formData.fullName,
        formData.email,
        formData.password
      );
      setUserProfile(userData);
      navigate("/onboarding-step-1");
    } catch (error) {
      console.error("Signup Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const userData = await signInWithGoogle();
      setUserProfile(userData);
      navigate("/onboarding-step-1");
    } catch (error) {
      console.error("Google Signup Error:", error);
    } finally {
      setLoading(false);
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
        <SignupCompt
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSignup}
          onGoogleSignup={handleGoogleSignup}
          loading={loading}
        />
      </div>
    </div>
  );
}
