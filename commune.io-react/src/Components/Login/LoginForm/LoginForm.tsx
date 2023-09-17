import React, { useState } from "react";
import IInput from "../../../Library/Input/IInput";
import ICheckbox from "../../../Library/Checkbox/ICheckbox";
import { Link, useNavigate } from "react-router-dom";
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm";

function LoginForm() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (): void => {
    navigate("/dashboard");
  };

  const handleForgotPasswordClick = (): void => {
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <div>
      <div className="grid-rows-2">
        <div className="h-screen flex items-center justify-center">
          <div className="grid grid-rows" style={{ width: "350px" }}>
            {showForgotPassword ? (
              <div>
                <ResetPasswordForm
                  handleForgotPasswordClick={handleForgotPasswordClick}
                />
              </div>
            ) : (
              <>
                <div className="mb-3 text-2xl font-medium">Login</div>
                <div className="font-light mb-8">
                  Sign in with your email address
                </div>
                <div>
                  <IInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="mt-4">
                  <IInput
                    type="password"
                    name="password"
                    placeholder="password"
                    label="Password"
                  />
                </div>
                <div className="flex mt-6 justify-between">
                  <div>
                    <ICheckbox label="Remember me" />
                  </div>
                  <div className="text-sm font-light">
                    <button
                      onClick={handleForgotPasswordClick}
                      className="text-regal-blue"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleLogin}
                    className="w-full rounded-2xl font-light text-white text-md bg-regal-blue py-2 px-8 border border-grey mt-6"
                  >
                    Continue
                  </button>
                </div>
                <div className="text-sm text-center mt-6 font-light text-slate-600">
                  Don't have an account yet?{" "}
                  <Link to="/signup" className="text-regal-blue">
                    Sign up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
