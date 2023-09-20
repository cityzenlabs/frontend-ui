import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";
import { login } from "../../../Actions/actions";
import { useSelector } from "react-redux";
import { RootState } from "../../../Actions/actionTypes";
import { useNavigate } from "react-router-dom";

function Success() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

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

    if (isLoggedIn) {
      // Navigate to the dashboard when isLoggedIn is true
      navigate("/dashboard");
    }

    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoggedIn, navigate]);

  const handleContinue = (): void => {
    dispatch(login());
  };

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
            <button
              onClick={handleContinue}
              className="w-full rounded-2xl font-light text-white text-md bg-regal-blue py-2 px-8 border border-grey mt-6"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
