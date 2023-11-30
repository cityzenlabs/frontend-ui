import React from "react";
import { Menu } from "@headlessui/react";

interface IMenuButtonProps {
  options: { label: string; action: () => void }[]; // Array of option objects
}

const IMenuButton: React.FC<IMenuButtonProps> = ({ options }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center space-x-1 px-2 py-1 text-slate-400 border bg-white rounded">
        <div className="w-6 h-6 flex m-auto">
          {/* SVG or icon for the button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
      </Menu.Button>

      <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
        {options.map((option, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                onClick={option.action}
              >
                {option.label}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default IMenuButton;
