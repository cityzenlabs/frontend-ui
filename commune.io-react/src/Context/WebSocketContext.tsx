import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useDash } from "./DashboardContext"; // Import useDash from DashboardContext
import { useAuth } from "./AuthContext";
import * as NotificationsService from "../Services/NotificationsService/NotificationsService";
interface WebSocketContextType {
  messages: any[];
  markNotificationAsRead: any;
}

export const WebSocketContext = createContext<WebSocketContextType | null>(
  null,
);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const accessToken = useAuth();
  const { user } = useDash();
  const [messages, setMessages] = useState<any[]>([]);

  const markNotificationAsRead = useCallback((id: any) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, read: true } : message,
      ),
    );
  }, []);

  const fetchNotifications = async () => {
    try {
      const notifications = await NotificationsService.getNotifications(
        accessToken.token,
      );
      if (notifications) {
        setMessages(notifications);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchNotifications();
      } catch (error) {}
    };

    fetchData();
    if (user) {
      const socket = new SockJS("http://localhost:8080/ws");
      const stompClient = Stomp.over(socket);

      stompClient.connect({}, () => {
        stompClient.subscribe(
          `/topic/notifications/${user?.id}`,
          (notification) => {
            const message = JSON.parse(notification.body);
            console.log(message);
            setMessages((prevMessages) => {
              if (
                !prevMessages.some(
                  (existingMessage) => existingMessage.id === message.id,
                )
              ) {
                const updatedMessages = [...prevMessages, message];
                return updatedMessages;
              }
              return prevMessages;
            });
          },
        );
      });

      return () => {
        if (stompClient.connected) {
          stompClient.disconnect();
        }
      };
    }
  }, [user]);

  return (
    <WebSocketContext.Provider value={{ messages, markNotificationAsRead }}>
      {children}
    </WebSocketContext.Provider>
  );
};
