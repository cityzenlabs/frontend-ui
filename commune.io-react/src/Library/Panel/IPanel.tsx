import React from "react";

interface IPanelProps {
  title?: string;
  buttonLabel?: string; // Label for the button
  onButtonClick?: () => void;
  onPanelClick?: () => void; // Event handler for the button click
  children?: React.ReactNode; // Optional children components
  height?: string; // New prop for custom height
  marginTop?: string; // New prop for custom top margin
  titleColor?: string;
}

function IPanel({
  title,
  buttonLabel,
  onButtonClick,
  onPanelClick,
  children, // Default height
  marginTop = "mt-0", // Default top margin
  titleColor,
  height,
}: IPanelProps) {
  return (
    <div className={`w-full ${marginTop} `} onClick={onPanelClick}>
      <div className={` rounded-lg bg-white px-7 py-2 ${height}`}>
        <div className="flex justify-between items-center mb-1">
          <div
            className={`font-medium ${title ? "my-auto" : ""} pt-2`}
            style={{ color: titleColor }}
          >
            {title}
          </div>
          {buttonLabel && (
            <button
              className="text-xs border rounded px-4 py-1 my-auto"
              onClick={(e) => {
                e.stopPropagation(); // Prevent panel click event when button is clicked
                onButtonClick && onButtonClick();
              }}
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
