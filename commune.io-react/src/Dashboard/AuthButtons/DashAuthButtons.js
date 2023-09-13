import React from "react";

function DashAuthButtons() {
  return (
    <div>
      <div class="items-center lg:justify-end grid justify-center grid-rows-1 gap-4 grid-flow-col border-b-2 h-20 px-36">
        <button class="rounded-2xl font-light text-white text-md bg-black py-2 px-4 ">
          Sign Up
        </button>
        <button class="rounded-2xl font-light text-black text-md bg-white py-2 px-4 border border-grey">
          Login
        </button>
      </div>
    </div>
  );
}

export default DashAuthButtons;
