import React from "react";
import { HomeProps } from "./types/HomeProps";
import Profile from "./Profile/Profile";
import HomeWelcome from "./HomeWelcome/HomeWelcome";
import HomeAttributes from "./HomeAttributes/HomeAttributes";
import HomeEvents from "./HomeEvents/HomeEvents";
import HomeRecommendations from "./HomeRecommendations/HomeRecommendations";
import HomeUpcomingEvents from "./HomeUpcomingEvents/HomeUpcomingEvents";

function Home({ viewProfile, setViewProfile, setSideBarSelection }: HomeProps) {
  return (
    <div>
      {viewProfile ? (
        <div className="xl:ml-[320px] md:ml-[320px] px-12 py-10">
          <Profile setViewProfile={setViewProfile} />
        </div>
      ) : (
        <div>
          <div className="xl:ml-[320px] md:ml-[320px] px-12 py-8">
            <label className="font-medium text-3xl">Dashboard</label>
            <div className="grid xl:grid-cols-2 gap-8">
              <div>
                <HomeWelcome
                  viewProfile={viewProfile}
                  setViewProfile={setViewProfile}
                />
                <HomeAttributes />
              </div>
              <div>
                <HomeEvents setSideBarSelection={setSideBarSelection} />
              </div>
            </div>
          </div>

          <div className="xl:ml-[320px] md:ml-[320px] px-12 ">
            <HomeRecommendations />
          </div>
          <div className="xl:ml-[320px] md:ml-[320px] px-12 py-8">
            <HomeUpcomingEvents />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
