import React from "react";
import { HomeWelcomeProps } from "./types/HomeWelcomeProps";

function HomeWelcome({ viewProfile, setViewProfile }: HomeWelcomeProps) {
  const handleSetViewProfile = (): void => {
    setViewProfile(true);
  };

  return (
    <div className="w-full">
      <div className="h-[80px] rounded-lg bg-white flex items-center px-4 mt-8">
        <div className="text-2xl">Welcome, Phillip</div>
        <div className="ml-auto text-sm border rounded py-1 px-4">
          <button onClick={handleSetViewProfile}>See profile</button>
        </div>
      </div>
    </div>
  );
}

export default HomeWelcome;
