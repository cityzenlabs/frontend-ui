import React from "react";

function DashImageSection({
  heading,
  text,
  buttonText,
  imageSrc,
  imageAlt,
  reverse,
}) {
  const textPositionClass = reverse ? "order-2" : "order-1";
  const imagePositionClass = reverse ? "order-1" : "order-2";

  return (
    <div
      className={`flex items-center justify-center lg:flex-row flex-col lg:space-x-8 space-y-8 sm:px-10 lg:mt-20 2xl:px-80 xl:px-60 lg:px-40 md:px-28`}
    >
      <div
        className={`bg-slate-50 w-full rounded-lg lg:w-1/2 ${imagePositionClass}`}
      >
        <img
          src={process.env.PUBLIC_URL + imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`lg:w-1/2 ${textPositionClass}`}>
        <div className="grid grid-rows p-4 m-2">
          <div className="font-medium text-3xl mb-15">{heading}</div>
          <div className="mb-5 mt-2 text-slate-400">{text}</div>
          <div>
            <button className="rounded-2xl font-light text-white text-sm bg-regal-blue py-2 px-4 mb-5">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashImageSection;
