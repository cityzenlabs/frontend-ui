import React from "react";

interface IToggleButtonOption {
  value: string;
  label: string;
}

interface IToggleButtonGroupProps {
  label?: string; // Optional label prop
  options: IToggleButtonOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

function IToggleButtonGroup({
  label,
  options,
  selectedValue,
  onChange,
}: IToggleButtonGroupProps) {
  return (
    <div>
      {label && <div className=" mb-1 font-thin">{label}</div>}
      <div className="xl:flex">
        {options.map((option) => (
          <button
            key={option.value}
            className={` rounded-2xl font-light text-md ${
              selectedValue === option.value
                ? "bg-regal-blue text-white"
                : "bg-white text-slate-400"
            } border py-2 px-6 mr-4 focus:outline-none focus:ring-2 focus:ring-regal-blue focus:border-transparent`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default IToggleButtonGroup;
