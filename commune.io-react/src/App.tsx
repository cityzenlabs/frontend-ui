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
import CommunityDiscovery from "./Components/Dashboard/Communities/CommunityDiscovery";
import Home from "./Components/Dashboard/Home/Home";
import EventDiscovery from "./Components/Dashboard/Events/EventDiscovery";
import Leaderboard from "./Components/Dashboard/Leaderboard/Leaderboard";
import Settings from "./Components/Dashboard/Settings/Settings";
import Notifications from "./Components/Dashboard/Notifications/Notifications";
import { DashboardProvider } from "./Context/DashboardContext";
import { AuthProvider } from "./AuthContext";
import Community from "./Components/Dashboard/Communities/Community/Community";
import CommunityMembersList from "./Components/Dashboard/Communities/CommunityMembersList/CommunityMembersList";
import CommunityProfile from "./Components/Dashboard/Communities/CommunityProfile/CommunityProfile";
import CommunityHome from "./Components/Dashboard/Communities/CommunityHome/CommunityHome";
import CommunityDashboard from "./Components/Dashboard/Communities/CommunityDashboard/CommunityDashboard";
import CommunityCreate from "./Components/Dashboard/Communities/CommunityCreate/CommunityCreate";
import CommunityEdit from "./Components/Dashboard/Communities/CommunityEdit/CommunityEdit";
import CommunityEvent from "./Components/Dashboard/Communities/CommunityEvent/CommunityEvent";
import Event from "./Components/Dashboard/Events/Event/Event";
import EventHome from "./Components/Dashboard/Events/EventHome/EventHome";
import EventDashboard from "./Components/Dashboard/Events/EventDashboard/EventDashboard";
import EventEdit from "./Components/Dashboard/Events/EventEdit/EventEdit";
import EventAttendeesList from "./Components/Dashboard/Events/EventAttendeesList/EventAttendeesList";
import EventProfile from "./Components/Dashboard/Events/EventProfile/EventProfile";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
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
            >
              <Route
                path="home"
                element={
                  <DashboardProvider>
                    <Home />
                  </DashboardProvider>
                }
              />

              <Route
                path="communities"
                element={
                  <DashboardProvider>
                    <CommunityDiscovery />
                  </DashboardProvider>
                }
              />
              <Route
                path="communities/:communityId"
                element={
                  <DashboardProvider>
                    <Community />
                  </DashboardProvider>
                }
              />

              <Route
                path="communities/members/:communityId"
                element={
                  <DashboardProvider>
                    <CommunityMembersList />
                  </DashboardProvider>
                }
              />

              <Route
                path="communities/profile/:userId"
                element={
                  <DashboardProvider>
                    <CommunityProfile />
                  </DashboardProvider>
                }
              />

              <Route
                path="communities/home"
                element={
                  <DashboardProvider>
                    <CommunityHome />
                  </DashboardProvider>
                }
              />

              <Route
                path="communities/create"
                element={
                  <DashboardProvider>
                    <CommunityCreate />
                  </DashboardProvider>
                }
              />

              <Route
                path="communities/edit/:communityId"
                element={
                  <DashboardProvider>
                    <CommunityEdit />
                  </DashboardProvider>
                }
              />

              <Route
                path="communities/manage/:communityId"
                element={
                  <DashboardProvider>
                    <CommunityDashboard />
                  </DashboardProvider>
                }
              />

              <Route
                path="communities/event/:eventId"
                element={
                  <DashboardProvider>
                    <CommunityEvent />
                  </DashboardProvider>
                }
              />

              <Route path="events" element={<EventDiscovery />} />
              <Route
                path="events/:eventId"
                element={
                  <DashboardProvider>
                    <Event />
                  </DashboardProvider>
                }
              />

              <Route
                path="events/home"
                element={
                  <DashboardProvider>
                    <EventHome />
                  </DashboardProvider>
                }
              />

              <Route
                path="events/manage/:eventId"
                element={
                  <DashboardProvider>
                    <EventDashboard />
                  </DashboardProvider>
                }
              />

              <Route
                path="events/edit/:eventId"
                element={
                  <DashboardProvider>
                    <EventEdit />
                  </DashboardProvider>
                }
              />

              <Route
                path="events/attendees/:eventId"
                element={
                  <DashboardProvider>
                    <EventAttendeesList />
                  </DashboardProvider>
                }
              />

              <Route
                path="events/profile/:userId"
                element={
                  <DashboardProvider>
                    <EventProfile />
                  </DashboardProvider>
                }
              />

              <Route path="leader-board" element={<Leaderboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>
            <Route path="account-created-successfully" element={<Success />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
