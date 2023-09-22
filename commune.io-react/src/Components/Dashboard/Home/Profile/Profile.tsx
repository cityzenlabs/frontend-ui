import React from "react";
import ProfileCommunities from "./ProfileCommunities/ProfileCommunities";
import ProfileStubs from "./ProfileStubs/ProfileStubs";
import { ProfileProps } from "./types/ProfileProps";

function Profile({ setViewProfile }: ProfileProps) {
  const handleSetViewProfile = (): void => {
    setViewProfile(false);
  };
  return (
    <div>
      <button
        className="flex items-center space-x-1 px-2 py-1 text-slate-400 border bg-white rounded"
        onClick={handleSetViewProfile}
      >
        <div className="w-6 h-6 flex m-auto transform rotate-90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="2 0 20 16"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.293 4.293a1 1 0 011.414 0L12 8.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>

      <div className="w-full mt-10">
        <div className=" rounded-lg bg-white px-12 py-6 ">
          <div className="flex">
            <div className="w-[136px] h-[136px] rounded-full overflow-hidden">
              <img
                src="levelUp.png"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-6 grid grid-rows">
              <div className="text-2xl">Phillip DiPhillipo</div>
              <div className="text-sm">Reputation Score - xx</div>
              <div className="text-sm">
                Florida, Miami <div className="text-sm">01.01.1993 - Male</div>
              </div>
            </div>
          </div>
          <div className="text-lg mt-12">Profile Points</div>
          <div className="xl:flex mt-3">
            <div className="w-1/2">
              <div className="h-[52px]">
                <div className="text-[#68BEF1]">Social</div>
                <div className="text-[11px]">LEVEL 1- 4/10 POINTS</div>
              </div>
              <div className="h-[52px]">
                <div className=" text-[#A979E6] mt-2">Nightlife</div>
                <div className="text-[11px]">LEVEL 1- 4/10 POINTS</div>
              </div>
              <div className="h-[52px]">
                <div className="text-[#FFA656] mt-2">Intelligence</div>
                <div className="text-[11px]">LEVEL 1- 4/10 POINTS</div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="h-[52px]">
                <div className="text-[#40B87E] ">Fitness</div>
                <div className="text-[11px]">LEVEL 1- 4/10 POINTS</div>
              </div>

              <div className="h-[52px]">
                <div className="text-[#4BCEC9] mt-2">Culture</div>
                <div className="text-[11px]">LEVEL 1- 4/10 POINTS</div>
              </div>

              <div className="h-[52px]">
                <div className="text-[#FF5050] mt-2">Adventure</div>
                <div className="text-[11px]">LEVEL 1- 4/10 POINTS</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <ProfileCommunities />
        </div>
        <div className="mt-8">
          <ProfileStubs />
        </div>
      </div>
    </div>
  );
}

export default Profile;
