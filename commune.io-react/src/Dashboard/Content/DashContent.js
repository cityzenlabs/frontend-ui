import React from "react";
import Image from "../../Image/Image";

import { Link } from "react-router-dom";

function DashContent() {
  return (
    <div>
      <div class="grid justify-center items-center pt-24 text-center lg:border-b-2">
        <div class="text-7xl font-bold">
          {" "}
          Easy way to explore <br /> more communities.{" "}
        </div>
        <div class="mt-5">
          <div class="font-light text-slate-400">
            Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis
            <br /> molestie, dictum esta, mattis tellus
          </div>
        </div>
        <div class="mt-10">
          <Link to="signup">
            <button class="rounded-2xl font-light text-white text-md bg-regal-blue py-4 px-10 ">
              Open Account
            </button>
          </Link>
          <button class="rounded-2xl font-light text-black text-md bg-white py-4 px-10 border border-grey ml-4">
            Login
          </button>
        </div>
        <div class="mt-5">Text goes here, Text goes here</div>
        <div style={{ overflow: "hidden" }}>
          <Image src={"/Frame.png"} alt={"image"} className={"lg:h-700"} />
        </div>
      </div>
    </div>
  );
}

export default DashContent;
