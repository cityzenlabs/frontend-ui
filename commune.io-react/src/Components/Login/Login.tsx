import React from "react";
import LoginForm from "./LoginForm/LoginForm";

function Login() {
  return (
    <div className="grid lg:grid-cols-2 ">
      <div>
        <div className="absolute bottom-0 p-10 ">
          <div className="text-xs text-black text-slate-400 ">
            Copyright COMMUNIE.IO 2023
          </div>
        </div>
        <LoginForm />
      </div>
      <div className="bg-gradient-to-tl from-slate-ish via-regal-blue to-white h-screen hidden lg:flex lg:items-center lg:justify-center p-32">
        <div className="text-white text-3xl text-center">
          "<span className="font-bold">Commune.io</span>{" "}
          <span className="font-thin">
            allows you to expand your circle by meeting new people at events in
            your local area."
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
