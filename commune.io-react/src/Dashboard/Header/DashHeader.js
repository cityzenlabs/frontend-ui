import React from "react";

function DashHeader() {
  return (
    <div>
      <div class="items-center justify-center text-center grid gap-3 grid-flow-col h-12 bg-gradient-to-r from-white from-1% via-regal-blue to-white ">
        <button class="rounded-full font-light text-regal-blue text-xs bg-white py-1 px-3">
          NEW INFO
        </button>
        <button class="rounded-full font-light text-white text-xs bg-regal-blue py-1 px-3 border border-white">
          MOBILE APPLICATION COMING SOON
        </button>
      </div>
    </div>
  );
}

export default DashHeader;
