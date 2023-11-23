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
        <label htmlFor={name} className="mb-1 font-thin">
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
        className="block w-full rounded-2xl font-medium text-black text-md bg-white border py-2 px-6 "
      />
    </div>
  );
}

export default IInput;
