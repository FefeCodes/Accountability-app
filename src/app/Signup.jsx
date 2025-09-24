import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SignupCompt from "../components/SignupCompt";
import accountabilityHero from "../assets/accountability-hero.svg";
import logo from "../assets/logo.svg";
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

      navigate(`/onboarding-step-${userData.onboardingStep}`);
    } catch (error) {
      console.error("Signup Error:", error);
      showErrorToast(error, "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const userData = await signInWithGoogle();
      setUserProfile(userData);

      navigate(`/onboarding-step-${userData.onboardingStep}`);
    } catch (error) {
      console.error("Google Signup Error:", error);
      showErrorToast(error, "Failed to sign up with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col lg:flex-row transition-colors duration-300 overflow-y-auto ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      {/* Mobile: centered logo */}
      <div className="lg:hidden w-full flex justify-center pt-4 z-50">
        <Link to="/">
          <img src={logo} alt="App Logo" className="h-12 w-12" />
        </Link>
      </div>
      {/* Desktop: top-left logo */}
      <div className="hidden lg:flex lg:fixed lg:top-4 lg:left-6 z-50">
        <Link to="/">
          <img src={logo} alt="App Logo" className="h-12 w-12" />
        </Link>
      </div>

      {/* Left Illustration */}
      <div className="hidden lg:flex lg:w-1/2 h-screen items-center justify-center pl-6">
        <img
          className="w-full h-full"
          src={accountabilityHero}
          alt="Accountability Hero"
        />
      </div>

      {/* Signup Form */}
      <div className="w-full lg:w-1/2 flex items-start lg:items-center justify-center p-4 lg:p-8">
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
