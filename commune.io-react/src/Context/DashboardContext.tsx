import React, { useContext, useState, useEffect } from "react";
import * as UserService from "../Services/UserService/UserService";
import { useAuth } from "./AuthContext";

const DashboardContext = React.createContext<any>("");

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState<any>(true);
  const accessToken = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await UserService.fetchUserProfile(accessToken.token);
        setUser(user);
        setIsLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, [accessToken]);

  const updateUserFields = (fieldsToUpdate: any) => {
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
