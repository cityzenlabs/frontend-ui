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
      className={`xl:ml-[330px] md:ml-[330px] xl:mr-[50px] md:mr-[50px] mr-[50px] ml-[50px]  ${paddingYClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default IContainer;
