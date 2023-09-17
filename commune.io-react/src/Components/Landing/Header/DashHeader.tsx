import React from "react";
import { Link } from "react-router-dom";

function DashHeader() {
  return (
    <div>
      <div className="items-center justify-center text-center grid gap-3 grid-flow-col h-12 bg-gradient-to-r from-white from-1% via-regal-blue to-white ">
        <button className="rounded-full font-light text-regal-blue text-xs bg-white py-1 px-3">
          NEW INFO
        </button>
        <button className="rounded-full font-light text-white text-xs bg-regal-blue py-1 px-3 border border-white">
          MOBILE APPLICATION COMING SOON
        </button>
      </div>
      <div className="items-center lg:justify-end grid justify-center grid-rows-1 gap-4 grid-flow-col border-b-2 h-20 px-36">
        <Link to="/signup">
          <button className="rounded-2xl font-light text-white text-md bg-black py-2 px-4 ">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="rounded-2xl font-light text-black text-md bg-white py-2 px-4 border border-grey">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DashHeader;
