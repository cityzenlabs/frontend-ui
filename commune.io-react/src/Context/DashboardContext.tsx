import React, { createContext, useContext, useState, useEffect } from "react";
import * as UserService from "../Services/UserService/UserService";
import { useAuth } from "./AuthContext";

const DashboardContext = React.createContext<any>("");

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }: any) => {
  const [userHome, setUserHome] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(true);
  const [triggerRefresh, setTriggerRefresh] = useState<any>(false);
  const accessToken = useAuth();

  const triggerDataRefresh = () => {
    setTriggerRefresh((prev: any) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataPromise = UserService.fetchUserHome(accessToken.token);
        const [userHomeData] = await Promise.all([userDataPromise]);
        setUserHome(userHomeData);
        setUser(userHomeData.user);
        setIsLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, [triggerRefresh, accessToken]);

  return (
    <DashboardContext.Provider
      value={{ userHome, user, isLoading, triggerDataRefresh }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDash = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
