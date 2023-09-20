// PrivateRoute.tsx

import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../src/Actions/actionTypes"; // Import your RootState type

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

function PrivateRoute({ path, element }: PrivateRouteProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

  useEffect(() => {
    // Listen for changes in isLoggedIn and update isAuthenticated accordingly
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

  const renderRoute = () => {
    if (isAuthenticated) {
      return element;
    }
  };

  return <Route path={path} element={renderRoute()} />;
}

export default PrivateRoute;
