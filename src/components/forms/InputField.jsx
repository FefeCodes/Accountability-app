import { useState } from "react";
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
  rounded = "lg", // 👈 default roundness
  className = "", // 👈 allow external styling too
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full space-y-2 mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-4 py-3 pr-10 border border-gray-300 
                      rounded-${rounded} focus:ring-2 focus:ring-blue-500 
                      focus:border-blue-500 transition-colors duration-200 
                      text-gray-900 placeholder-gray-500 ${className}`}
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
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 
                       hover:bg-gray-100 rounded transition-colors cursor-pointer"
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
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 
                       hover:bg-gray-100 rounded transition-colors cursor-pointer"
          >
            {icon}
          </button>
        )}
      </div>
    </div>
  );
}
