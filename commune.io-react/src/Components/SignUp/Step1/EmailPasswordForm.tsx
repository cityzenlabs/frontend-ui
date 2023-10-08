import React, { useState } from "react";
import { Link } from "react-router-dom";
import IInput from "../../../Library/Input/IInput";

function EmailPasswordForm({ onNextStep, userData, updateUser }: any) {
  const [error, setError] = useState("");

  const handleContinue = async (): Promise<void> => {
    const bodyData = {
      authType: "EMAIL",
      authIdentifier: userData.email,
    };

    if (userData.email && userData.password) {
      try {
        const response = await fetch(
          `http://localhost:8080/app-service/users/new-user-validation`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
          },
        );

        const result = await response.json();

        if (!result) {
          setError("Email already taken!"); // or handle this in a better way
        } else {
          onNextStep();
        }
      } catch (error) {
        setError("Something went wrong. Please try again later.");
      }
    } else {
      alert("Please complete the form before proceeding.");
    }
  };

  return (
    <div>
      <div className="grid-rows-2">
        <div className="h-screen flex items-center justify-center">
          <div className="grid grid-rows" style={{ width: "350px" }}>
            <div className="mb-3 text-2xl font-medium">Create new account</div>
            <div className="font-light mb-8">Start today for free</div>
            <div>
              <IInput
                label="Email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={userData.email}
                onChange={(e) =>
                  updateUser({ ...userData, email: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <IInput
                type="password"
                name="password"
                placeholder="password"
                label="Password"
                value={userData.password}
                onChange={(e) =>
                  updateUser({ ...userData, password: e.target.value })
                }
              />
            </div>
            {error && <div className=" text-sm text-red-500 mt-4">{error}</div>}

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
            <div className="text-sm text-center mt-6 font-light text-slate-600">
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
