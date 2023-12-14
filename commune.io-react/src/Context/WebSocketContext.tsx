import React, { createContext, ReactNode, useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

interface WebSocketContextType {
  messages: any[]; // Replace 'any' with the specific type of your messages
}

export const WebSocketContext = createContext<WebSocketContextType | null>(
  null,
);

interface WebSocketProviderProps {
  children: ReactNode; // This type allows any valid React children
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [messages, setMessages] = useState<any[]>(() => {
    const savedMessages = localStorage.getItem("messages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/notifications", (notification) => {
        const message = JSON.parse(notification.body);
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, message];
          localStorage.setItem("messages", JSON.stringify(updatedMessages));
          return updatedMessages;
        });
      });
    });

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};
