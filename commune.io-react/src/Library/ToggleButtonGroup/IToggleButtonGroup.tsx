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
      {label && <div className=" text-sm mb-1 font-thin">{label}</div>}
      <div>
        {options.map((option) => (
          <div className="pb-2">
            <button
              key={option.value}
              className={` rounded-2xl font-light text-xs ${
                selectedValue === option.value
                  ? "bg-regal-blue text-white"
                  : "bg-white text-slate-400"
              } border py-1 px-4 mr-4 focus:outline-none focus:ring-2 focus:ring-regal-blue focus:border-transparent`}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IToggleButtonGroup;
