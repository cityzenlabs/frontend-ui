import React from "react";

interface ILabelProps {
  text: string; // The text content of the label
  size?: string; // Font size class, e.g., "text-3xl"
  weight?: string; // Font weight class, e.g., "font-medium"
  className?: string; // Additional custom classes for the label
}

function ILabel({
  text,
  size = "text-2xl", // Default size
  weight = "font-medium", // Default weight
  className = "",
}: ILabelProps) {
  return <label className={`${weight} ${size} ${className}`}>{text}</label>;
}

export default ILabel;
