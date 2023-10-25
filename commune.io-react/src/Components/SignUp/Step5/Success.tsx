import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";

function Success() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const confettiColors = ["#5081FF", "#232427", "C7D5FB"];

  const confettiConfig = {
    width: viewportWidth,
    height: viewportHeight,
    numberOfPieces: 50,
    recycle: true,
    colors: confettiColors,
  };

  useEffect(() => {
    const handleResize = (): void => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="grid lg:grid-cols-2 ">
      <div>
        <div className="absolute bottom-0 p-10">
          <div className="text-xs text-black text-slate-400">
            Copyright COMMUNIE.IO 2023
          </div>
        </div>
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
              <Link to="/login">
                <button className="w-full rounded-2xl font-light text-white text-md bg-regal-blue py-2 px-8 border border-grey mt-6">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-tl from-slate-ish via-regal-blue to-white h-screen hidden lg:flex lg:items-center lg:justify-center p-32">
        <div className="text-white text-3xl text-center">
          "<span className="font-bold">Commune.io</span>{" "}
          <span className="font-thin">
            allows you to expand your circle by meeting new people at events in
            your local area."
          </span>
        </div>
      </div>
    </div>
  );
}

export default Success;
