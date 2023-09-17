import React from "react";

interface NotificationProps {
  onNextStep: () => void;
}

function Notification({ onNextStep }: NotificationProps) {
  const handleContinue = (): void => {
    onNextStep();
  };

  return (
    <div>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col" style={{ width: "350px" }}>
          <div className="mb-3 text-2xl font-medium">Email was sent</div>

          <div className="font-thin">
            Link to active your account was sent to your email address
          </div>
          <div>
            <button
              onClick={handleContinue}
              className="w-full rounded-2xl font-light text-white text-md bg-regal-blue py-2 px-8 border border-grey mt-6"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
