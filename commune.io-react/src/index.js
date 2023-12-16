import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./Context/AuthContext";
import { WebSocketProvider } from "./Context/WebSocketContext";
import { DashboardProvider } from "./Context/DashboardContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <DashboardProvider>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </DashboardProvider>
  </AuthProvider>,
);

reportWebVitals();
