import { useState, useEffect } from "react";
import eyeShow from "../../assets/eye-show.svg";
import eyeHide from "../../assets/eye-hide.svg";

export default function InputField({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  icon = null,
  onIconClick,
  rounded = "lg",
  className = "",
  password = "", // ✅ for confirm password field
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [messages, setMessages] = useState([]);
  const isPassword = type === "password";

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (!isPassword) return;

    const newMessages = [];

    // ✅ Confirm Password Validation
    if (name === "confirmPassword") {
      if (value && value !== password) {
        newMessages.push({ text: "Passwords do not match ❌", type: "error" });
      }
      if (value && value === password) {
        newMessages.push({ text: "Passwords match ✅", type: "success" });
      }
    } 
    // ✅ Main Password Validation
    else {
      if (value.length > 0 && value.length < 8) {
        newMessages.push({ text: "Password must be at least 8 characters long.", type: "error" });
      }
      if (value && !/[A-Z]/.test(value)) {
        newMessages.push({ text: "Password must contain at least one uppercase letter.", type: "error" });
      }
      if (value && !/[0-9]/.test(value)) {
        newMessages.push({ text: "Password must contain at least one number.", type: "error" });
      }
      if (value && !/[!@#$%^&*(),.?\":{}|<>]/.test(value)) {
        newMessages.push({ text: "Password must contain at least one special character.", type: "error" });
      }
    }

    setMessages(newMessages);
  }, [value, password, isPassword, name]);

  // ✅ Default mb-4 unless overridden
  const containerClasses = `w-full space-y-1 ${className || "mb-4"}`;

  return (
    <div className={containerClasses}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          className={`w-full px-4 py-3 text-base pr-10 border border-gray-300 
                      rounded-${rounded} focus-visible:outline-none focus:ring-1 focus:ring-blue-500 
                      focus:border-blue-500 transition-colors duration-200 
                      text-gray-900 placeholder-gray-500`}
          type={isPassword && showPassword ? "text" : type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />

        {isPassword && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 
                       hover:bg-gray-100 rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <img
              src={showPassword ? eyeShow : eyeHide}
              alt={showPassword ? "Hide password" : "Show password"}
              className="w-5 h-5"
            />
          </button>
        )}

        {!isPassword && icon && (
          <button
            type="button"
            onClick={onIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 
                       hover:bg-gray-100 rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {icon}
          </button>
        )}
      </div>

      {/* ✅ Validation Messages */}
      {isPassword && messages.length > 0 && (
        <ul className="mt-2 text-sm space-y-1">
          {messages.map((msg, idx) => (
            <li
              key={idx}
              className={msg.type === "error" ? "text-red-500" : "text-green-600 font-medium"}
            >
               {msg.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
