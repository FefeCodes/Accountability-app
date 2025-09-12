import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // add Link
import SignupCompt from "../components/SignupCompt";
import accountabilityHero from "../assets/accountability-hero.svg";
import logo from "../assets/logo.svg"; // import your logo
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
      className={`w-full min-h-screen flex flex-col lg:flex-row transition-colors duration-300 overflow-y-auto ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      {/* Logo Position */}
      <div className="w-full flex justify-center lg:fixed lg:top-4 lg:left-6 lg:justify-start pt-4 mb-2 lg:mb-0 z-50">
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
