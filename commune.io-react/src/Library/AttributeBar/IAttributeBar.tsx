// IAttributeBar.tsx
import React from "react";

interface IAttribute {
  level: number;
  points: number;
}

interface IAttributeBarProps {
  attributeKey: string;
  attributeValue: IAttribute;
  color: string; // Pass the color as a prop
}

function IAttributeBar({
  attributeKey,
  attributeValue,
  color,
}: IAttributeBarProps) {
  return (
    <div className="w-full xl:w-1/2 h-[52px]">
      <div style={{ color: color }}>
        {" "}
        {/* Use inline style for color */}
        {attributeKey}
      </div>
      <div className="text-[11px]">
        {`LEVEL ${attributeValue.level} - ${attributeValue.points}/100 POINTS`}
      </div>
      <div
        style={{
          position: "relative",
          width: "75%",
          height: "4px",
        }}
      >
        {/* Full progress bar */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: color,
            opacity: 0.3,
          }}
        ></div>

        {/* Filled portion of the progress bar */}
        <div
          style={{
            position: "absolute",
            width: `${(attributeValue.points / 100) * 100}%`,
            height: "100%",
            backgroundColor: color,
            opacity: 1,
          }}
        ></div>
      </div>
    </div>
  );
}

export default IAttributeBar;
