import React from "react";
import Image from "../../../Library/Image/Image";
import DashImageSection from "./ImageSection/DashImageSection";

import { ACCORDIAN_OPTIONS, CHECK_SECTION_ITEMS } from "../../../constants";
import IAccordian from "../../../Library/Accordian/IAccordian";

import { Link } from "react-router-dom";

function DashBody() {
  return (
    <div>
      <div className="grid justify-center items-center pt-24 text-center lg:border-b-2">
        <div className="text-7xl font-bold">
          {" "}
          Easy way to explore <br /> more communities.{" "}
        </div>
        <div className="mt-5">
          <div className="font-light text-slate-400">
            Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis
            <br /> molestie, dictum esta, mattis tellus
          </div>
        </div>
        <div className="mt-10">
          <Link to="/signup">
            <button className="rounded-2xl font-light text-white text-md bg-regal-blue py-4 px-10 ">
              Open Account
            </button>
          </Link>
          <Link to="/login">
            <button className="rounded-2xl font-light text-black text-md bg-white py-4 px-10 border border-grey ml-4">
              Login
            </button>
          </Link>
        </div>
        <div className="mt-5">Text goes here, Text goes here</div>
        <div style={{ overflow: "hidden" }}>
          <Image src={"/Frame.png"} alt={"image"} className={"lg:h-700"} />
        </div>
      </div>

      <DashImageSection
        heading="Section 1 Heading"
        text="A lot of random words just to see if this is working the way that it is supposed to."
        buttonText="Get started"
        imageSrc="/leaderBoard.png"
        imageAlt="Leaderboard"
        reverse={false}
      />
      <DashImageSection
        heading="Section 2 Heading"
        text="A lot of random words just to see if this is working the way that it is supposed to."
        buttonText="Get started"
        imageSrc="/graph.png"
        imageAlt="Graph"
        reverse={true}
      />

      <div className="h-440 w-full bg-regal-blue mt-20 grid lg:grid-cols-3  text-center place-content-center">
        {CHECK_SECTION_ITEMS.map((item, index) => (
          <div key={index} className="mb-5 px-10 ">
            <div className="text-white text-2xl font-thin">{item.heading}</div>
            <div className="text-white font-thin">{item.text}</div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center mb-5">
        <div className="text-4xl font-medium">Frequently asked questions</div>
        <div className="text-slate-400 text-md font-light">
          Everything you need to know about the product and billing.
        </div>

        <IAccordian items={ACCORDIAN_OPTIONS} />
      </div>
    </div>
  );
}

export default DashBody;
