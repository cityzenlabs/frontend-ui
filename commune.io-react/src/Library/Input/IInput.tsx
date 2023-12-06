import React from "react";

interface IInputProps {
  name: string;
  placeholder: string;
  label?: string;
  type?: string;
  value?: string;
  numberOnly?: boolean; // New prop to enable number only input
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function IInput({
  name,
  placeholder,
  label,
  type = "text",
  value,
  numberOnly,
  onChange,
}: IInputProps) {
  // Function to prevent non-numeric input
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
      {label && (
        <label htmlFor={name} className=" font-thin">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown} // Add the onKeyDown event handler
        className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
}

export default IInput;
