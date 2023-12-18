import React, { useContext, useState, useEffect } from "react";
import * as UserService from "../Services/UserService/UserService";
import { useAuth } from "./AuthContext";

const DashboardContext = React.createContext<any>("");

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }: any) => {
  const [userHome, setUserHome] = useState<any>(null);
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState<any>(true);
  const accessToken = useAuth();

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
  }, [accessToken]);

  const updateUserFields = (fieldsToUpdate: any) => {
    console.log(user);
    setUser((prevUser: any) => ({
      ...prevUser,
      ...fieldsToUpdate,
    }));
  };

  const joinCommunity = (communityId: string) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      joinedCommunities: [...prevUser.joinedCommunities, communityId],
    }));
  };

  const leaveCommunity = (communityId: string) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      joinedCommunities: prevUser.joinedCommunities.filter(
        (id: any) => id !== communityId,
      ),
    }));
  };

  const joinEvent = (eventId: string) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      joinedEvents: [...prevUser.joinedEvents, eventId],
    }));
  };

  const leaveEvent = (eventId: string) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      joinedEvents: prevUser.joinedEvents.filter((id: any) => id !== eventId),
    }));
  };

  return (
    <DashboardContext.Provider
      value={{
        userHome,
        user,
        isLoading,
        updateUserFields,
        joinCommunity,
        leaveCommunity,
        joinEvent,
        leaveEvent,
      }}
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
