import React, { useState } from "react";
import IButton from "../../../../Library/Button/IButton";

function Notifications() {
  const options = [
    {
      id: "1",
      title: "User Notifications",
      description: "Get alerts directly on your desktop screen.",
    },
    {
      id: "2",
      title: "Event Notifications",
      description: "Receive regular updates and newsletters.",
    },
    {
      id: "3",
      title: "Community Notifications",
      description: "Stay informed with the latest news.",
    },
    {
      id: "4",
      title: "Leaderboard Notifications",
      description: "Enhance your skills with our curated tips.",
    },
    {
      id: "5",
      title: "Event Organizer Notifications",
      description: "Participate in surveys and feedback sessions.",
    },
    {
      id: "6",
      title: "Community Organizer Notifications",
      description: "Get notified when someone joins.",
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
          } ${index === 2 ? "mt-2.5" : ""}`}
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
              className={`w-5 h-5 border transition transform cursor-pointer ${
                checkedOptions[option.id]
                  ? "border-regal-blue bg-white"
                  : "border-slate-400 bg-white"
              } rounded-md inline-block mr-2`}
              onClick={() => toggleOption(option.id)}
            >
              {checkedOptions[option.id] && (
                <svg
                  className="w-4 h-4 text-regal-blue"
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
        <IButton text="Save Changes" onClick={() => console.log("")}></IButton>
      </div>
    </div>
  );
}

export default Notifications;
