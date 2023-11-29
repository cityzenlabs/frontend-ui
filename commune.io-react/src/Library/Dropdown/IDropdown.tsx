import React, { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";

interface IDropdownProps {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  onChange?: (value: string) => void;
  labelText: string;
}

function IDropdown({
  options,
  placeholder,
  onChange,
  labelText,
}: IDropdownProps) {
  // Initialize the state with the first option's value or a default value
  const [selectedValue, setSelectedValue] = useState<string>();

  // Effect to update the selected value when options change

  // Handle value change
  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="relative">
      {labelText && <label className="mb-1 font-thin">{labelText}</label>}
      <Listbox value={selectedValue} onChange={handleValueChange}>
        {({ open }) => (
          <>
            <Listbox.Button
              className={`relative w-full cursor-default bg-white py-2 pl-3 pr-10 text-left block rounded-2xl font-medium text-md border focus:outline-none focus-visible:border-sky-500 focus-visible:ring-sky-500 shadow-sm focus:border-sky-500 focus:ring-sky-500 ${
                options?.find((option) => option.value === selectedValue)
                  ? "text-black"
                  : "text-gray-400"
              }`}
              style={{
                minHeight: "40px",
                display: "flex",
                alignItems: "center",
              }} // Set a minimum height and use flexbox for centering
            >
              {options?.find((option) => option.value === selectedValue)
                ?.label ||
                (placeholder && (
                  <span className="text-gray-400">{placeholder}</span>
                ))}
            </Listbox.Button>

            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-2xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options?.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className="py-2 pl-3 pr-10 cursor-pointer hover:bg-gray-100"
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "text-regal-blue" : ""
                      }`}
                    >
                      {option.label}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  );
}

export default IDropdown;
