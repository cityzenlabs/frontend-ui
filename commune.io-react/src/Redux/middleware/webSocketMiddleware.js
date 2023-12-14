// middleware/webSocketMiddleware.js
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import {
  receiveMessage,
  connectWebSocket,
  disconnectWebSocket,
} from "../actions/webSocketActions";

// middleware/webSocketMiddleware.js

const webSocketMiddleware = (store) => {
  let socket = null;
  let stompClient = null;

  const connect = () => {
    socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      store.dispatch(connectWebSocket());
      stompClient.subscribe("/topic/notifications", (notification) => {
        store.dispatch(receiveMessage(JSON.parse(notification.body)));
      });
    });
  };

  const disconnect = () => {
    if (stompClient && stompClient.connected) {
      stompClient.disconnect();
      store.dispatch(disconnectWebSocket());
    }
  };

  return (next) => (action) => {
    switch (action.type) {
      case "INITIALIZE_WEBSOCKET":
        connect();
        break;
      case "DISCONNECT_WEBSOCKET":
        disconnect();
        break;
      default:
        break;
    }
    return next(action);
  };
};

export default webSocketMiddleware;
