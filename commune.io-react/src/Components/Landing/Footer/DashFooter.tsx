import React from "react";
import Image from "../../../Library/Image/Image";

function DashFooter() {
  return (
    <div className="bg-slate-50">
      <div className="mt-10 pt-10 grid place-content-center">
        <Image src="/people.png" alt="people" />
      </div>

      <div className="text-center mb-20">
        <div className="mt-5 text-2xl font-light">Still have questions?</div>
        <div className="mt-1 text-1xl text-gray-500 font-light">
          Can't find the answer you're looking for? Contact us.
        </div>
        <button className="rounded-2xl font-light text-white text-md bg-regal-blue py-2 px-4 mt-5">
          Contact us
        </button>
      </div>
      <div className="h-full bg-slate-ish">
        <div className="p-32">
          <div className="text-white text-4xl">Sign in for newsletter</div>
          <div className="text-gray-400 font-light mt-4">
            Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis <br /> molestie, dictum est a mattis tellus
          </div>
          <div className="mt-5">
            <input
              type="email"
              name="email"
              className=" mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="you@example.com"
              style={{ width: "300px" }}
            />
            <button className="rounded-2xl font-light text-white text-md bg-regal-blue py-2 px-4 mt-5">
              Contact us
            </button>
          </div>
        </div>
      </div>
      <div className="h-24 border-t border-gray-400 bg-slate-ish flex justify-end items-center pr-8 lg:pr-32">
        <div className="text-sm text-white">COMMUNIE.IO 2023</div>
      </div>
    </div>
  );
}

export default DashFooter;
