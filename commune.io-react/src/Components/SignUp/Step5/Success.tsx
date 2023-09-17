import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

function Success() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const confettiColors = ["#5081FF", "#232427", "C7D5FB"];

  // Set confetti properties
  const confettiConfig = {
    width: viewportWidth,
    height: viewportHeight,
    numberOfPieces: 50,
    recycle: true, // Set to true for continuous animation
    colors: confettiColors,
  };

  useEffect(() => {
    // Update the viewport dimensions when the window is resized
    const handleResize = (): void => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return (): void => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Confetti {...confettiConfig} />

      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col" style={{ width: "350px" }}>
          <div className="mb-3 text-4xl font-medium text-center">
            You are done!
          </div>

          <div className="font-thin text-1xl text-center">
            Create and manage communities, enjoy the events and meet amazing
            people
          </div>
          <div>
            <button className="w-full rounded-2xl font-light text-white text-md bg-regal-blue py-2 px-8 border border-grey mt-6">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
