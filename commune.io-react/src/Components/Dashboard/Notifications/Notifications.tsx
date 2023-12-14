import React from "react";
import { useSelector } from "react-redux";

function NotificationsComponent() {
  // Use useSelector to access the messages from the Redux store
  const messages = useSelector((state: any) => state.webSocket.messages);

  return (
    <div>
      <h2>Notifications</h2>
      {messages.map((msg: any, index: any) => (
        <div key={index}>{JSON.stringify(msg)}</div>
      ))}
    </div>
  );
}

export default NotificationsComponent;
