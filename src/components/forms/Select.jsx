import { useState } from "react";

export default function Select({
  label,
  options,
  onChange,
  value,
  required = false,
}) {
  const [selected, setSelected] = useState(value || "");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelected(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-y-1">
      {label && (
        <label className="text-base font-medium text-black">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        value={selected}
        onChange={handleChange}
        required={required}
        className="w-full px-3 py-3 border border-gray-300 text-base rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3C91E6] focus:border-[#3C91E6] transition-all duration-200 appearance-none cursor-pointer hover:border-gray-400"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 0.5rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.5em 1.5em",
          paddingRight: "3rem",
        }}
      >
        <option value="" className="text-base text-gray-300" disabled>
          -- Select an option --
        </option>
        {options.map((opt, index) => (
          <option key={index} value={opt} className="py-2 text-base text-gray-800">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
