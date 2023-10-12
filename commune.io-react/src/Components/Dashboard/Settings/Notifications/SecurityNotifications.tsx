import React, { useState } from "react";

function Notifications() {
  const options = [
    {
      id: "1",
      title: "Enable Desktop notifications",
      description: "Get alerts directly on your desktop screen.",
    },
    {
      id: "2",
      title: "Communication email",
      description: "Receive regular updates and newsletters.",
    },
    {
      id: "3",
      title: "Receive news and updates from us",
      description: "Stay informed with the latest news.",
    },
    {
      id: "4",
      title: "Receive tips and tutorials from us",
      description: "Enhance your skills with our curated tips.",
    },
    {
      id: "5",
      title: "User research",
      description: "Participate in surveys and feedback sessions.",
    },
    {
      id: "6",
      title: "New join to the community",
      description: "Get notified when someone joins.",
    },
    {
      id: "7",
      title: "New join to the event",
      description: "Never miss out on any community events.",
    },
  ];

  // Initializing the state with option ids as keys and false as their default values.
  const initialCheckState = options.reduce((acc, option) => {
    acc[option.id] = false;
    return acc;
  }, {} as Record<string, boolean>);
  const [checkedOptions, setCheckedOptions] = useState(initialCheckState);

  const toggleOption = (optionId: string) => {
    setCheckedOptions((prevState) => ({
      ...prevState,
      [optionId]: !prevState[optionId],
    }));
  };

  return (
    <div>
      {options.map((option, index) => (
        <div
          key={option.id}
          className={`flex items-center mb-8 ${
            option.title === "Communication email" ? "border-b pb-8" : ""
          } ${
            index === 2 ? "mt-2.5" : "" // Add margin-top to the option after "Communication email"
          }`}
        >
          <div className="relative flex items-center">
            <input
              id={`checkbox-${option.id}`}
              type="checkbox"
              className="hidden"
              checked={checkedOptions[option.id]}
              onChange={() => toggleOption(option.id)}
            />
            <span
              className={`w-6 h-6 border transition transform cursor-pointer ${
                checkedOptions[option.id]
                  ? "border-regal-blue bg-white"
                  : "border-slate-400 bg-white"
              } rounded-md inline-block mr-2`}
              onClick={() => toggleOption(option.id)}
            >
              {checkedOptions[option.id] && (
                <svg
                  className="w-5 h-5 text-regal-blue"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 21 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </span>
          </div>
          <div>
            <label
              htmlFor={`checkbox-${option.id}`}
              className="cursor-pointer block font-light"
            >
              {option.title}
            </label>
            <p className="text-sm text-gray-500 font-thin">
              {option.description}
            </p>
          </div>
        </div>
      ))}
      <div className="mt-8 ">
        <button className="rounded-2xl font-light text-white text-md bg-regal-blue py-3 px-4 ">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Notifications;
