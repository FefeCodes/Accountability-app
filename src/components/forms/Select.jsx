import { useEffect, useRef, useState } from "react";

export default function Select({
  label,
  options,
  onChange,
  value,
  required = false,
}) {
  const [selected, setSelected] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelected(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSelect = (newValue) => {
    setSelected(newValue);
    if (onChange) {
      onChange(newValue);
    }
    setOpen(false);
  };

  useEffect(() => {
    setSelected(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        listRef.current &&
        !listRef.current.contains(event.target)
      ) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onKeyDown = (event) => {
    if (
      !open &&
      (event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === " ")
    ) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(
        Math.max(
          0,
          options.findIndex((o) => o === selected)
        )
      );
      return;
    }

    if (!open) return;

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => {
        const next = prev < options.length - 1 ? prev + 1 : 0;
        return next;
      });
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => {
        const next = prev > 0 ? prev - 1 : options.length - 1;
        return next;
      });
    } else if (event.key === "Enter") {
      event.preventDefault();
      const indexToUse =
        activeIndex >= 0
          ? activeIndex
          : options.findIndex((o) => o === selected);
      const choice = options[indexToUse] ?? options[0];
      if (choice !== undefined) {
        handleSelect(choice);
      }
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
      {/* Hidden native select to keep backward compatibility with onChange signature */}
      <select
        value={selected}
        onChange={handleChange}
        required={required}
        className="hidden"
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

      {/* Custom Select UI */}
      <div className="relative w-full">
        <button
          type="button"
          ref={buttonRef}
          onClick={() => setOpen((prev) => !prev)}
          onKeyDown={onKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={
            "w-full px-3 py-3 border text-base rounded-lg bg-white transition-all duration-200 cursor-pointer flex items-center justify-between " +
            (open
              ? "border-[#3C91E6] ring-2 ring-[#3C91E6]"
              : "border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3C91E6] focus:border-[#3C91E6]")
          }
        >
          <span className={selected ? "text-gray-900" : "text-gray-400"}>
            {selected || "-- Select an option --"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={
              "h-5 w-5 transition-transform " +
              (open ? "rotate-180" : "rotate-0")
            }
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M6 8l4 4 4-4"
              stroke="#6b7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open && (
          <ul
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg ring-1 ring-black/5"
          >
            {options.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500">No options</li>
            )}
            {options.map((opt, index) => {
              const isActive = index === activeIndex;
              const isSelected = opt === selected;
              return (
                <li
                  key={opt + index}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(-1)}
                  onClick={() => handleSelect(opt)}
                  className={
                    "flex items-center justify-between px-3 py-2 cursor-pointer text-base " +
                    (isActive ? "bg-[#EFF6FF]" : "bg-white") +
                    (isSelected
                      ? " text-[#3C91E6] font-medium"
                      : " text-gray-800")
                  }
                >
                  <span>{opt}</span>
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5 10l3 3 7-7"
                        stroke="#3C91E6"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
