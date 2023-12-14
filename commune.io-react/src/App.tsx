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
import Community from "./Components/Dashboard/Communities/Community/Community";
import CommunityMembersList from "./Components/Dashboard/Communities/CommunityMembersList/CommunityMembersList";
import CommunityHome from "./Components/Dashboard/Communities/CommunityHome/CommunityHome";
import CommunityDashboard from "./Components/Dashboard/Communities/CommunityDashboard/CommunityDashboard";
import CommunityCreate from "./Components/Dashboard/Communities/CommunityCreate/CommunityCreate";
import CommunityEdit from "./Components/Dashboard/Communities/CommunityEdit/CommunityEdit";
import Event from "./Components/Dashboard/Events/Event/Event";
import EventHome from "./Components/Dashboard/Events/EventHome/EventHome";
import EventDashboard from "./Components/Dashboard/Events/EventDashboard/EventDashboard";
import EventEdit from "./Components/Dashboard/Events/EventEdit/EventEdit";
import EventAttendeesList from "./Components/Dashboard/Events/EventAttendeesList/EventAttendeesList";

import Profile from "./Components/Dashboard/Profile/Profile";
import EventCreate from "./Components/Dashboard/Events/EventCreate/EventCreate";
import { ScreenSizeProvider } from "./Context/ScreenContext";
import Communities from "./Components/Dashboard/Communities/Communities/Communities";

function App() {
  return (
    <div>
      <Router>
        <ScreenSizeProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/landing" />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route path="home" element={<Home />} />
              <Route path="communities/:kind" element={<Communities />} />
              <Route path="communities" element={<CommunityDiscovery />} />
              <Route
                path="community/:communityName/:communityId"
                element={<Community />}
              />
              <Route
                path="community/:communityId/members"
                element={<CommunityMembersList />}
              />
              <Route path="communities/home" element={<CommunityHome />} />
              <Route path="communities/create" element={<CommunityCreate />} />
              <Route
                path="communities/edit/:communityId"
                element={<CommunityEdit />}
              />
              <Route
                path="community/manage/:communityId"
                element={<CommunityDashboard />}
              />

              <Route path="events" element={<EventDiscovery />} />
              <Route path="event/:eventName/:eventId" element={<Event />} />
              <Route path="events/home" element={<EventHome />} />
              <Route
                path="event/manage/:eventId"
                element={<EventDashboard />}
              />
              <Route path="event/edit/:eventId" element={<EventEdit />} />
              <Route
                path="events/:eventId/attendees"
                element={<EventAttendeesList />}
              />
              <Route path="events/create" element={<EventCreate />} />
              <Route path="/profile/:userId" element={<Profile />} />

              <Route path="settings" element={<Settings />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>
            <Route path="account-created-successfully" element={<Success />} />
          </Routes>
        </ScreenSizeProvider>
      </Router>
    </div>
  );
}

export default App;
