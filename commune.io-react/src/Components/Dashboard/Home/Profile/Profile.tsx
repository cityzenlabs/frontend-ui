import React from "react";
import ProfileCommunities from "./ProfileCommunities/ProfileCommunities";
import ProfileStubs from "./ProfileStubs/ProfileStubs";
import { ProfileProps } from "./types/ProfileProps";

function Profile({ setViewProfile, user }: ProfileProps) {
  const handleSetViewProfile = (): void => {
    setViewProfile(false);
  };

  const attributeColors = [
    "#68BEF1",
    "#40B87E",
    "#4BCEC9",
    "#A979E6",
    "#FFA656",
    "#FF5050",
  ];

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
              <div className="text-2xl">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-sm">
                Reputation Score - {user?.reputation}
              </div>
              <div className="text-sm">
                {user?.city}, {user.state}{" "}
                <div className="text-sm">
                  {user?.dateOfBirth} - {user?.gender}
                </div>
              </div>
            </div>
          </div>
          <div className="text-lg mt-12">Profile Points</div>
          <div className="xl:flex mt-3">
            <div className="w-full xl:w-full">
              <div className="xl:flex xl:flex-wrap">
                {user.attributes.map((attribute: any, index: number) => (
                  <div className="w-full xl:w-1/2 h-[52px]" key={index}>
                    <div className={`text-[${attributeColors[index]}]`}>
                      {attribute.attribute}
                    </div>
                    <div className="text-[11px]">{`LEVEL ${attribute.level} - ${attribute.points}/100 POINTS`}</div>
                    <div
                      style={{
                        position: "relative", // Parent needs to be relative
                        width: "75%",
                        height: "4px",
                      }}
                    >
                      {/* Full progress bar */}
                      <div
                        style={{
                          position: "absolute", // Child needs to be absolute
                          width: "100%",
                          height: "100%",
                          backgroundColor: attributeColors[index],
                          opacity: 0.3, // Opacity for the whole bar
                        }}
                      ></div>

                      {/* Filled portion of the progress bar */}
                      <div
                        style={{
                          position: "absolute", // Child needs to be absolute
                          width: `${(attribute.points / 100) * 100}%`, // Calculate percentage
                          height: "100%",
                          backgroundColor: attributeColors[index],
                          opacity: 1, // Fully opaque
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
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
