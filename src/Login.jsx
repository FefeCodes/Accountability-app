import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginCompt from "./LoginCompt";
import myLogo from "./assets/logo.svg";
import { signInWithGoogle, signInWithEmail } from "./firebase";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

   const handleLogin = async () => {
    try {
      const userData = await signInWithEmail(formData.email, formData.password);
      console.log("Email/Password User:", userData);
      navigate("/dashboard", {state: {user: userData}});
    } catch (error) {
      alert("Login failed. Please check your email or password.");
    }
  };

   const handleGoogleLogin = async () => {
    try {
      const userData = await signInWithGoogle();
      console.log("Google User:", userData);
      navigate("/dashboard", { state: {user: userData} });
    } catch (error) {
      alert("Google login failed. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-row justify-center items-start bg-[#F5F7FA]">
      <img
        className="p-4 w-1/2 h-1/2 justify-self-center self-center"
        src={myLogo}
        alt={"Icon"}
      />
      <LoginCompt
        formData={formData}
        onChange={handleChange}
        onSubmit={handleLogin}
        onGoogleLogin={handleGoogleLogin}
      />
    </div>
  );
}
