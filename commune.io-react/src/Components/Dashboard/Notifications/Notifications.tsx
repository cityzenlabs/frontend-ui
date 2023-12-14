// NotificationsComponent.js
import React, { useContext } from "react";
import { WebSocketContext } from "../../../Context/WebSocketContext"; // Adjust the import path

function NotificationsComponent() {
  const context = useContext(WebSocketContext);

  // Check if context is not null
  if (!context) return null;

  const { messages } = context;

  return (
    <div>
      <h2>Notifications</h2>
      {messages.map((msg, index) => (
        <div key={index}>{JSON.stringify(msg)}</div>
      ))}
    </div>
  );
}

export default NotificationsComponent;
