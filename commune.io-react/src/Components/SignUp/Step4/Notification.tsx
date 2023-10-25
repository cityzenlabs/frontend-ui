import React from "react";

function Notification() {
  return (
    <div>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col" style={{ width: "350px" }}>
          <div className="mb-3 text-2xl font-medium">Email was sent</div>
          <div className="font-thin">
            Link to active your account was sent to your email address
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
