import React from "react";

function CheckSection() {
  const items = [
    {
      heading: "Heading goes here",
      text: "A lot of random works just to see if this is working the way that it is supposed to.",
    },
    {
      heading: "Heading goes here",
      text: "A lot of random works just to see if this is working the way that it is supposed to.",
    },
    {
      heading: "Heading goes here",
      text: "A lot of random works just to see if this is working the way that it is supposed to.",
    },
  ];

  return (
    <div>
      <div className="h-440 w-full bg-regal-blue mt-20 grid lg:grid-cols-3  text-center place-content-center">
        {items.map((item, index) => (
          <div key={index} className="mb-5 px-10 ">
            <div className="text-white text-2xl font-thin">{item.heading}</div>
            <div className="text-white font-thin">{item.text}</div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center mb-5">
        <div className="text-4xl font-medium">Frequently asked questions</div>
        <div className="text-slate-400 text-md font-light">
          Everything you need to know about the product and billing.
        </div>
      </div>
    </div>
  );
}

export default CheckSection;
