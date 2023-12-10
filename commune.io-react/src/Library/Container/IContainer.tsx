import React from "react";

interface IContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  paddingY?: number; // Now expecting a number
}

function IContainer({
  children,
  className = "",
  style,
  paddingY = 0, // Default paddingY to 0 if not provided
}: IContainerProps) {
  // Construct the padding class dynamically based on paddingY prop
  const paddingYClass = `py-${paddingY}`;

  return (
    <div
      className={`xl:ml-[360px] md:ml-[360px] xl:mr-[80px] md:mr-[80px] mr-[80px] ml-[80px]  ${paddingYClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default IContainer;
