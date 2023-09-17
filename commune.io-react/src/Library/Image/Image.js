import React from "react";

function Image({ src, alt, className }) {
  return (
    <div className={className}>
      <img src={src} alt={alt} />
    </div>
  );
}

export default Image;