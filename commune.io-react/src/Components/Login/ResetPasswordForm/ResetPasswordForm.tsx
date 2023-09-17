import React, { useState } from "react";
import IInput from "../../../Library/Input/IInput";
import PasswordNotification from "../Notification/PasswordNotification";

interface ResetPasswordFormProps {
  handleForgotPasswordClick: () => void;
}

function ResetPasswordForm({
  handleForgotPasswordClick,
}: ResetPasswordFormProps) {
  const [step, setStep] = useState<number>(1);
  const handleBack = (): void => {
    handleForgotPasswordClick();
  };

  const handleNextStep = (): void => {
    setStep(step + 1);
  };

  return (
    <div>
      {step === 1 && (
        <div className="h-screen flex items-center justify-center">
          <div className="grid grid-rows" style={{ width: "350px" }}>
            <div className="mb-3 text-2xl font-medium">Reset password</div>
            <div className="font-light text-slate-400 mb-8">
              Enter your email address below, and we'll send you instructions on
              how to reset your password.
            </div>
            <div>
              <IInput
                label="Email"
                type="email"
                name="email"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <button
                className="w-full rounded-2xl font-light text-white text-md bg-regal-blue py-2 px-8 border border-grey mt-6"
                onClick={handleNextStep}
              >
                Continue
              </button>{" "}
              <button
                onClick={handleBack}
                className="w-full rounded-2xl font-light text-black text-md bg-white py-2 px-8 mt-6"
              >
                Go back to login
              </button>
            </div>
          </div>
        </div>
      )}
      {step === 2 && <PasswordNotification />}
    </div>
  );
}

export default ResetPasswordForm;
