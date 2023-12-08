import React from "react";

interface IButtonProps {
  text: string;
  onClick: () => void;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  className?: string;
  icon?: React.ReactNode; // For adding icons or additional elements
  disabled?: boolean;
}

function IButton({
  text,
  onClick,
  bgColor = "bg-white", // Default background color
  textColor = "text-black", // Default text color
  borderColor = "border", // Default border color
  className = "",
  icon = null, // Default to no icon
  disabled,
}: IButtonProps) {
  return (
    <button
      className={`rounded-lg text-xs sm:text-sm md:text-sm lg:text-sm ${textColor} ${bgColor} border ${borderColor} px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-1 lg:py-1 font-light ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon} {text}
    </button>
  );
}

export default IButton;
