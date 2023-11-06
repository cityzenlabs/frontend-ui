import React from "react";

interface IButtonProps {
  text: string;
  onClick: () => void;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  className?: string;
  icon?: React.ReactNode; // For adding icons or additional elements
}

function IButton({
  text,
  onClick,
  bgColor = "bg-white", // Default background color
  textColor = "text-black", // Default text color
  borderColor = "border", // Default border color
  className = "",
  icon = null, // Default to no icon
}: IButtonProps) {
  return (
    <button
      className={`rounded-2xl font-medium ${textColor} text-md ${bgColor} ${borderColor} py-2 px-6 mr-4 focus:border-blue-600 focus:ring-blue-500 focus:ring-1 shadow-sm ${className}`}
      onClick={onClick}
    >
      {text} {icon}
    </button>
  );
}

export default IButton;
