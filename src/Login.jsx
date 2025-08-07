import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCompt from "./LoginCompt";
import myLogo from "./assets/logo.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = () => {
    // login validation
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // successful login
    navigate("/dashboard");
  };

  const handleGoogleLogin = () => {
    //Google auth
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
