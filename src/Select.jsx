import { useState } from "react";

export default function Select({ label, options, onChange }) {
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    setSelected(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-y-2">
      {label && (
        <label className="text-lg font-medium text-black">{label}</label>
      )}
      <select
        value={selected}
        onChange={handleChange}
        className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3C91E6]"
      >
        <option value="" disabled>
          -- Select an option --
        </option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
