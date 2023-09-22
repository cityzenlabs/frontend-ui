import React from "react";

function HomeRecommendations() {
  return (
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
  );
}

export default HomeRecommendations;
