import React from "react";
import { Link } from "react-router-dom";

interface EmailPasswordFormProps {
  onNextStep: () => void;
}

function EmailPasswordForm({ onNextStep }: EmailPasswordFormProps) {
  const handleContinue = (): void => {
    onNextStep();
  };

  return (
    <div>
      <div className="grid-rows-2">
        <div className="h-screen flex items-center justify-center">
          <div className="grid grid-rows" style={{ width: "350px" }}>
            <div className="mb-3 text-2xl font-medium">Create new account</div>
            <div className="font-light mb-8">Start today for free</div>
            <div>Email</div>
            <input
              type="email"
              name="email"
              className=" mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="you@example.com"
            />
            <div className="mt-4">Password</div>
            <input
              type="password"
              name="password"
              className=" mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="password"
            />
            <div className="mt-2 text-sm font-thin">At least 8 characters.</div>
            <div>
              <button
                className="w-full rounded-2xl font-light text-white text-md bg-regal-blue py-2 px-8 border border-grey mt-6"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
            <div className="text-xs text-slate-400 mt-3">
              By signing up, you agree to the Terms of Service and Privacy
              Policy, including Cookie Use.
            </div>
            <div className="text-sm px-16 mt-6 font-light text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="text-regal-blue">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailPasswordForm;
