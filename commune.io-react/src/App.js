import "./App.css";
import React from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
