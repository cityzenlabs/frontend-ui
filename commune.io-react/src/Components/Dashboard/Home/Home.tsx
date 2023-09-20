import React from "react";
import { HomeProps } from "./types/HomeProps";
import Profile from "./Profile/Profile";

function Home({ viewProfile, setViewProfile }: HomeProps) {
  const handleViewProfile = (): void => {
    setViewProfile(!viewProfile);
  };
  return (
    <div>
      {viewProfile ? (
        <Profile />
      ) : (
        <div className="lg:ml-[320px] md:ml-[320px] p-12 ">
          <label className="text-3xl font-medium">Dashboard</label>
          <div className="grid xl:grid-cols-2 md:grid-cols sm:grid-cols gap-4 mt-8">
            <div className="grid grid-flow-row auto-rows-max gap-4">
              <div className="h-[80px] rounded-lg bg-white flex items-center px-4">
                <div className=" text-2xl">Welcome, Phillip</div>
                <div className="ml-auto text-sm border rounded py-1 px-4">
                  <button onClick={handleViewProfile}>See profile</button>
                </div>
              </div>
              <div className="h-[403px] rounded-lg bg-white px-4 py-6 ">
                Your top 4 attributes
              </div>
            </div>
            <div className="h-[500px] rounded-lg bg-white px-4 py-6 ">
              <div className="flex justify-between">
                <div className="text-2xl">Level up with these events</div>
                <div>
                  <button className="text-sm border rounded py-1 px-4">
                    See All
                  </button>
                </div>
              </div>
              <div>
                <div className="grid grid-rows gap-4 py-6">
                  <div className="bg-slate-50 rounded p-2 flex">
                    <img src="/levelUp.png" alt="level" />
                    <div className="px-4">
                      <span className="font-light">Event name goes here</span>
                      <div className="text-xs mt-1">
                        01.21.2024 32 Justin rd
                      </div>
                      <div className="text-xs mt-1">+20</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded p-2 flex">
                    <img src="/levelUp.png" alt="level" className="" />
                    <div className="px-4">
                      <span className="font-light">Event name goes here</span>
                      <div className="text-xs mt-1">
                        01.21.2024 32 Justin rd
                      </div>
                      <div className="text-xs mt-1">+20</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded p-2 flex">
                    <img src="/levelUp.png" alt="level" className="" />
                    <div className="px-4">
                      <span className="font-light">Event name goes here</span>
                      <div className="text-xs mt-1">
                        01.21.2024 32 Justin rd
                      </div>
                      <div className="text-xs mt-1">+20</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded p-2 flex">
                    <img src="/levelUp.png" alt="level" className="" />
                    <div className="px-4">
                      <span className="font-light">Event name goes here</span>
                      <div className="text-xs mt-1">
                        01.21.2024 32 Justin rd
                      </div>
                      <div className="text-xs mt-1">+20</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[244px] rounded-lg bg-white mt-4"></div>

          <div className="h-[244px] rounded-lg bg-white mt-4"></div>

          <div className="h-[244px] rounded-lg bg-white mt-4"></div>
        </div>
      )}
    </div>
  );
}

export default Home;
