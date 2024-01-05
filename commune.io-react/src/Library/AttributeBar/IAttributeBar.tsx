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
    <div className={`${widthClass} `}>
      <div style={{ color: color }}>{attributeKey}</div>
      <div className="text-xs text-[#7E858B]">
        {`LEVEL ${attributeValue.level} - ${attributeValue.points}/100 `}
      </div>
      <div
        style={{
          position: "relative",
          width: "90%",
          height: "4px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: color,
            opacity: 0.3,
          }}
        ></div>

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
