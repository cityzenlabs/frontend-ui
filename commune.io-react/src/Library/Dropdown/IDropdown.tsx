import React, { useState } from "react";
import { Listbox } from "@headlessui/react";

interface IDropdownProps {
  options: Array<{ value: any; label: any }>;
  placeholder?: string;
  onChange?: (value: string) => void;
  labelText: string;
  value: any;
}

function IDropdown({
  options,
  placeholder,
  onChange,
  labelText,
  value,
}: IDropdownProps) {
  const [selectedValue, setSelectedValue] = useState<string>(value);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="relative">
      {labelText && (
        <label className="mb-1 font-thin text-sm">{labelText}</label>
      )}
      <Listbox value={selectedValue} onChange={handleValueChange}>
        {({ open }) => (
          <>
            <Listbox.Button
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                options?.find((option) => option.value === selectedValue)
                  ? "text-black"
                  : "text-gray-400"
              }`}
              style={{
                minHeight: "40px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {options?.find((option) => option.value === selectedValue)
                ?.label ||
                (placeholder && (
                  <span className="text-gray-400">{placeholder}</span>
                ))}
            </Listbox.Button>

            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-2xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs">
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
