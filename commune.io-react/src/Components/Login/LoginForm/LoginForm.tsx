import React, { useState, ChangeEvent } from "react";
import IInput from "../../../Library/Input/IInput";
import ICheckbox from "../../../Library/Checkbox/ICheckbox";
import { Link, useNavigate } from "react-router-dom";
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm";
import { useAuth } from "../../../AuthContext";

function LoginForm() {
  const { setToken } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authType: "EMAIL",
          authIdentifier: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.accessToken);
        navigate("/home");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
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
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>
                <div className="mt-4">
                  <IInput
                    type="password"
                    name="password"
                    placeholder="password"
                    label="Password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm mt-4">{error}</div>
                )}
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
