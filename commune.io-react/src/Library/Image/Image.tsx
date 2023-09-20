import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string; // Make className optional with '?'
}

function Image({ src, alt, className }: ImageProps) {
  return (
    <div className={className}>
      <img src={src} alt={alt} />
    </div>
  );
}

export default Image;
