import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Success from "./Components/SignUp/Step5/Success";
import ProtectedRoute from "./ProtectedRoute"; // Make sure this path is correct
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/account-created-successfully" element={<Success />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
