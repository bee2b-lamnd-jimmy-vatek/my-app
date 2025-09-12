import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const Select: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select an option",
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className="relative w-64">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-background-input px-3 py-2 text-left text-sm text-text-caption shadow-sm focus:border-gray-200 focus:outline-none"
      >
        <span>{selectedLabel || placeholder}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-background-input shadow-lg">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
              className="cursor-pointer px-3 py-2 text-sm text-text-caption hover:bg-button-bg hover:text-text-header"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
