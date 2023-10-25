import React from "react";
import { HomeProps } from "./types/HomeProps";
import Profile from "./Profile/Profile";

function Home({ viewProfile, setViewProfile, user }: HomeProps) {
  const handleSetViewProfile = (): void => {
    setViewProfile(true);
  };
  return (
    <div>
      {viewProfile ? (
        <div className="xl:ml-[320px] md:ml-[320px] px-12 py-10">
          <Profile setViewProfile={setViewProfile} user={user} />
        </div>
      ) : (
        <div>
          <div className="xl:ml-[320px] md:ml-[320px] px-12 py-8">
            <label className="font-medium text-3xl">Dashboard</label>
            <div className="grid xl:grid-cols-2 gap-8">
              <div>
                <div className="w-full">
                  <div className="h-[80px] rounded-lg bg-white flex items-center px-4 mt-8">
                    <div className="text-2xl">Welcome, {user?.firstName}</div>
                    <div className="ml-auto text-sm border rounded py-1 px-4">
                      <button onClick={handleSetViewProfile}>
                        See profile
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="h-[403px] rounded-lg bg-white px-4 py-6 mt-8">
                    Your top 4 attributes
                  </div>
                </div>
              </div>
              <div>
                <div className="w-full">
                  <div className="h-[515px] rounded-lg bg-white px-4 py-6 xl:mt-8">
                    <div className="flex justify-between">
                      <div className="text-2xl">
                        Level up with these <br /> events
                      </div>
                      <div>
                        <button className="text-sm border rounded py-1 px-4">
                          See All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:ml-[320px] md:ml-[320px] px-12 ">
            <div className="w-full">
              <div className="h-[244px] rounded-lg bg-white px-4 py-6 ">
                <div className="flex justify-between">
                  <div className="text-xl">Recommended Communities</div>
                  <div>
                    <button className="text-sm border rounded py-1 px-4">
                      See All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:ml-[320px] md:ml-[320px] px-12 py-8">
            <div className="w-full">
              <div className="h-[244px] rounded-lg bg-white px-4 py-6 ">
                <div className="flex justify-between">
                  <div className="text-xl">Upcoming Events</div>
                  <div>
                    <button className="text-sm border rounded py-1 px-4">
                      See All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
