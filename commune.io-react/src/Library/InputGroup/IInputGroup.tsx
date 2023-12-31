import React from "react";

interface InputConfig {
  name: string;
  placeholder: any;
  type?: string;
  value?: any;
  numberOnly?: boolean; // New property to enable number only input
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayLabel?: string;
  disabled?: boolean;
}

interface IInputGroupProps {
  inputs: InputConfig[];
  label: string;
  floatingLabel?: boolean;
}

const IInputGroup: React.FC<IInputGroupProps> = ({
  inputs,
  label,
  floatingLabel,
}) => {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    numberOnly?: boolean,
  ) => {
    if (numberOnly) {
      const allowedKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "Backspace",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        // Add any additional keys that should be allowed
      ];
      if (
        !allowedKeys.includes(event.key) &&
        !event.ctrlKey &&
        !event.metaKey
      ) {
        event.preventDefault();
      }
    }
  };

  return (
    <div>
      <div className="mb-1 font-thin text-sm">{label}</div>
      <div className="flex justify-between w-full">
        {inputs.map((input, index) => (
          <div
            key={index}
            className={`flex-grow ${
              index !== inputs.length - 1 ? "mr-2" : ""
            } relative`}
          >
            {floatingLabel ? (
              <>
                <input
                  id={`input-${index}`}
                  name={input.name}
                  placeholder=" "
                  type={input.type || "text"}
                  value={input.value}
                  onChange={input.onChange}
                  onKeyDown={(event) => handleKeyDown(event, input.numberOnly)}
                  disabled={input.disabled} // Apply the disabled attribute
                  className="border px-2 pb-1 pt-2 w-full text-xs text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:border-blue-600 focus:outline-none focus:ring-0 peer"
                />
                <label
                  htmlFor={`input-${index}`}
                  className="absolute text-gray-900 text-xs duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  {input.displayLabel || input.placeholder}
                </label>
              </>
            ) : (
              // For regular input
              <input
                id={`input-${index}`}
                name={input.name}
                placeholder={input.placeholder}
                type={input.type || "text"}
                value={input.value}
                onChange={input.onChange}
                onKeyDown={(event) => handleKeyDown(event, input.numberOnly)}
                disabled={input.disabled} // Apply the disabled attribute
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IInputGroup;
