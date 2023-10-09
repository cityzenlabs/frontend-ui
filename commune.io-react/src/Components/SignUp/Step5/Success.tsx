import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

function Success({ userData, updateUser }: any) {
  const navigate = useNavigate();

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

  const handleContinue = async (): Promise<void> => {
    const user = {
      authDto: {
        authType: "EMAIL",
        authIdentifier: userData.email,
      },
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      city: userData.city,
      state: userData.state,
      picture: "",
      dateOfBirth: userData.year + "-" + userData.month + "-" + userData.day,
    };

    try {
      const response = await fetch("http://localhost:8080/app-service/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        navigate("/dashboard");
      }
    } catch (error) {}
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
