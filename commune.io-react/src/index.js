import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./Context/AuthContext";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { DashboardProvider } from "./Context/DashboardContext";
import { initializeWebSocket } from "./Redux/actions/webSocketActions";
const root = ReactDOM.createRoot(document.getElementById("root"));
store.dispatch(initializeWebSocket());
root.render(
  <Provider store={store}>
    <AuthProvider>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </AuthProvider>
  </Provider>,
);

reportWebVitals();
