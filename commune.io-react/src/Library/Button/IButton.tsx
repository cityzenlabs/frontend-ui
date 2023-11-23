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
      className={`rounded-2xl font-light ${textColor} text-md ${bgColor} ${borderColor}  px-3   ${className}`}
      onClick={onClick}
    >
      {text} {icon}
    </button>
  );
}

export default IButton;
