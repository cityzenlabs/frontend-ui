import React from "react";
import { Listbox } from "@headlessui/react";

interface IListBoxProps {
  options: string[] | number[];
  placeHolder: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
}

function IListBox({ options, placeHolder, value, onChange }: IListBoxProps) {
  const handleValueChange = (newSelectedValue: string | number) => {
    if (onChange) {
      onChange(newSelectedValue);
    }
  };

  return (
    <div className="relative">
      <Listbox value={value} onChange={handleValueChange}>
        {({ open }) => (
          <>
            <Listbox.Button className="relative w-full cursor-default bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-sky-500 focus-visible:ring-sky-500 block w-full rounded-md sm:text-sm focus-visible:ring-1 shadow-sm border border-slate-300 focus:border-sky-500 focus:ring-sky-500">
              {value || placeHolder}
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ">
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  value={option}
                  className="py-2 pl-3 pr-10"
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "text-regal-blue" : ""
                        }`}
                      >
                        {option}
                      </span>
                    </>
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

export default IListBox;
