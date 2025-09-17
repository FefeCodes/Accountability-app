import { useState } from "react";
import InputField from "./InputField.jsx";

export default function Search({
  value = "",
  onChange,
  placeholder = "Search...",
}) {
  const [query, setQuery] = useState(value);

  const handleSearch = () => {
    console.log("Searching for:", query);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const searchIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
      />
    </svg>
  );

  return (
    <InputField
      type="text"
      name="search"
      placeholder={placeholder}
      value={query}
      onChange={handleChange}
      icon={searchIcon}
      onIconClick={handleSearch}
      rounded="full"
      className="mb-0"
    />
  );
}
