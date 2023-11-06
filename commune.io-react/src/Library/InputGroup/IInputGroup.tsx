import React from "react";

interface InputConfig {
  name: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayLabel?: string;
}

interface IInputGroupProps {
  inputs: InputConfig[];
  label: string;
  floatingLabel?: boolean; // Optional prop to enable floating labels
}

const IInputGroup: React.FC<IInputGroupProps> = ({
  inputs,
  label,
  floatingLabel,
}) => {
  return (
    <div>
      {/* Regular label - shown if floatingLabel is not true */}
      {<div className=" font-thin">{label}</div>}

      {/* Inputs container */}
      <div className=" flex justify-between  w-full">
        {inputs.map((input, index) => (
          <div
            key={index}
            className={`flex-grow ${
              index !== inputs.length - 1 ? "mr-2" : ""
            } relative`}
          >
            {/* Floating label input structure - shown if floatingLabel is true */}
            {floatingLabel && (
              <>
                <input
                  name={input.name}
                  placeholder=" "
                  type={input.type || "text"}
                  value={input.value}
                  onChange={input.onChange}
                  className="border border-slate-200 px-2 pb-1 pt-2 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:border-blue-600 focus:outline-none focus:ring-0 peer"
                />
                <label
                  htmlFor="floating_outlined"
                  className=" absolute text-xs  dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-50  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  {input.displayLabel}
                </label>
              </>
            )}

            {/* Regular input structure - shown if floatingLabel is not true */}
            {!floatingLabel && (
              <input
                name={input.name}
                placeholder={input.placeholder}
                type={input.type || "text"}
                value={input.value}
                onChange={input.onChange}
                className="block w-full rounded-2xl border py-2 px-6 focus:border-regal-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm placeholder-slate-400 focus:outline-none"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IInputGroup;
