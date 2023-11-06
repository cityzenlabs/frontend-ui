import React from "react";

interface IPanelProps {
  title?: string;
  buttonLabel?: string; // Label for the button
  onButtonClick?: () => void; // Event handler for the button click
  children?: React.ReactNode; // Optional children components
  height?: string; // New prop for custom height
  marginTop?: string; // New prop for custom top margin
  titleColor?: string;
}

function IPanel({
  title,
  buttonLabel,
  onButtonClick,
  children,
  height = "h-[244px]", // Default height
  marginTop = "mt-0", // Default top margin
  titleColor,
}: IPanelProps) {
  return (
    <div className={`w-full ${marginTop}`}>
      <div className={`${height} rounded-lg bg-white px-4 py-6`}>
        <div className="flex justify-between items-center">
          <div className="text-xl" style={{ color: titleColor }}>
            {title}
          </div>
          {buttonLabel && (
            <button
              className="text-sm border rounded py-1 px-4"
              onClick={onButtonClick}
            >
              {buttonLabel}
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

export default IPanel;
