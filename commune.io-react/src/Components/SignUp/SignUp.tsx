import React, { useState } from "react";
import EmailPasswordForm from "./Step1/EmailPasswordForm";
import GeneralInformationForm from "./Step2/GeneralInformationForm";
import DetailForm from "./Step3/DetailForm";
import Notification from "./Step4/Notification";
import Success from "./Step5/Success";

function SignUp() {
  const [step, setStep] = useState<number>(1);

  const handleNextStep = (): void => {
    setStep(step + 1);
  };

  return (
    <div className="grid lg:grid-cols-2 ">
      <div>
        <div className="absolute bottom-0 p-10">
          <div className="text-xs text-black text-slate-400">
            Copyright COMMUNIE.IO 2023
          </div>
        </div>
        {step === 1 && <EmailPasswordForm onNextStep={handleNextStep} />}
        {step === 2 && <GeneralInformationForm onNextStep={handleNextStep} />}
        {step === 3 && <DetailForm onNextStep={handleNextStep} />}
        {step === 4 && <Notification onNextStep={handleNextStep} />}
        {step === 5 && <Success />}
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

export default SignUp;
