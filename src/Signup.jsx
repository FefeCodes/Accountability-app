import { useState } from "react";
import SignupCompt from "./SignupCompt";
import myLogo from "./assets/logo.svg";

export default function Signup() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  return (
    <div className="w-full h-screen flex flex-row justify-center items-start bg-[#F5F7FA]">
      <img
        className="p-4 w-1/2 h-1/2 justify-self-center self-center"
        src={myLogo}
        alt={"Icon"}
      />

      <SignupCompt
        formData={formData}
        onChange={handleChange}
      />
    </div>
  );
}
