import React from "react";

function SignUp() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-2/4 bg-white text-white"></aside>

      <main className="flex-1 relative hidden lg:block">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tl from-slate-ish via-regal-blue to-white">
          <div className="text-white text-center text-3xl p-32">
            "<span className="font-bold">Commune.io</span>{" "}
            <span className="font-thin">
              allows you to expand your circle by meeting new people at events
              in your local area."
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignUp;
