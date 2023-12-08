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
  children,
  height = "h-[244px]", // Default height
  marginTop = "mt-0", // Default top margin
  titleColor,
}: IPanelProps) {
  return (
    <div className={`w-full ${marginTop}`} onClick={onPanelClick}>
      <div className={`${height} rounded-lg bg-white px-7 py-2`}>
        <div className="flex justify-between items-center mb-1">
          <div
            className={`font-light ${title ? "my-auto" : ""}`}
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
