import { useState } from "react";

export default function InputField({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-y-2">
      <label className="text-lg font-medium text-black">{label}</label>
      <div className="relative w-full">
        <input
          className="w-full h-auto border border-[#474646] rounded-md px-2 py-2.5 text-l font-regular text-[#545454]"
          type={isPassword && showPassword ? "text" : type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <img
              src={
                showPassword
                  ? "/src/assets/eye-show.svg"
                  : "/src/assets/eye-hide.svg"
              }
              alt={showPassword ? "Hide password" : "Show password"}
              className="w-5 h-5"
            />
          </button>
        )}
      </div>
    </div>
  );
}
