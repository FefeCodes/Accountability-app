import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCompt from "./LoginCompt";
import myLogo from "./assets/logo.svg";
import { signInWithGoogle, signInWithEmail } from "./firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

   const handleLogin = async () => {
    try {
      const userData = await signInWithEmail(email, password);
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
        email={email}
        password={password}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onSubmit={handleLogin}
        onGoogleLogin={handleGoogleLogin}
      />
    </div>
  );
}
