// IAttributeBar.tsx
import React from "react";

interface IAttribute {
  level: number;
  points: number;
}

interface IAttributeBarProps {
  attributeKey: string;
  attributeValue: IAttribute;
  color: string;
  isHalfWidth?: boolean; // Optional boolean prop
}

function IAttributeBar({
  attributeKey,
  attributeValue,
  color,
  isHalfWidth = false,
}: IAttributeBarProps) {
  const widthClass = isHalfWidth ? "xl:w-1/2" : "w-full";

  return (
    <div
      className={`${widthClass} h-[52px]`}
      style={{ marginTop: "8px", marginBottom: "8px" }}
    >
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
