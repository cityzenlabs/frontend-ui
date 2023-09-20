import React from "react";

interface DashImageSectionProps {
  heading: string;
  text: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
  reverse: boolean;
}

function DashImageSection({
  heading,
  text,
  buttonText,
  imageSrc,
  imageAlt,
  reverse,
}: DashImageSectionProps) {
  const textPositionClass = reverse ? "order-2" : "order-1";
  const imagePositionClass = reverse ? "order-1" : "order-2";

  return (
    <div
      className={`flex items-center justify-center place-content-center lg:flex-row flex-col sm:px-10 lg:mt-10`}
    >
      <div
        className={`bg-slate-50 w-full rounded-lg lg:w-1/2 p-4 ${imagePositionClass}`} // Add padding here
        style={{ maxWidth: "500px" }} // Set the desired width
      >
        <img
          src={process.env.PUBLIC_URL + imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className={` ${textPositionClass} p-24`}>
        <div className="grid grid-rows">
          <div className="font-medium text-3xl">{heading}</div>
          <div className="mb-5 mt-2 text-slate-400">{text}</div>
          <div>
            <button className="rounded-2xl font-light text-white text-sm bg-regal-blue py-2 px-4">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashImageSection;
