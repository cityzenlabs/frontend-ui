import React from "react";
import { Menu } from "@headlessui/react";
import IPanel from "../Panel/IPanel";
import IToggleButtonGroup from "../ToggleButtonGroup/IToggleButtonGroup";

const IMenuButtonFilter = ({ filterOptions }: any) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center space-x-1 px-2 py-1 text-slate-400 border bg-white rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
          />
        </svg>
      </Menu.Button>

      <Menu.Items className="absolute z-10 right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
        <IPanel>
          {filterOptions.map((option: any, index: any) => (
            <IToggleButtonGroup
              key={index}
              label={option.label}
              options={option.options}
              onChange={option.onChange}
              selectedValue={option.selectedValue}
            />
          ))}
        </IPanel>
      </Menu.Items>
    </Menu>
  );
};

export default IMenuButtonFilter;
