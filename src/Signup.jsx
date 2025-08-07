import { useState } from "react";
import SignupCompt from "./SignupCompt";
import myLogo from "./assets/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleFullNameChange = (e) => setFullName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSignup = () => {
    // form submission
  };

  const handleGoogleSignup = () => {
    // Google signup
  };

  return (
    <div className="w-full h-screen flex flex-row justify-center items-start bg-[#F5F7FA]">
      <img
        className="p-4 w-1/2 h-1/2 justify-self-center self-center"
        src={myLogo}
        alt={"Icon"}
      />

      <SignupCompt
        fullName={fullName}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onFullNameChange={handleFullNameChange}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onConfirmPasswordChange={handleConfirmPasswordChange}
        onSubmit={handleSignup}
        onGoogleSignup={handleGoogleSignup}
      />
    </div>
  );
}
