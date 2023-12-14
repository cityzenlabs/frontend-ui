export const receiveMessage = (message) => ({
  type: "RECEIVE_MESSAGE",
  payload: message,
});

export const connectWebSocket = () => ({
  type: "CONNECT_WEBSOCKET",
});

export const disconnectWebSocket = () => ({
  type: "DISCONNECT_WEBSOCKET",
});

// actions/webSocketActions.js

export const initializeWebSocket = () => ({
  type: "INITIALIZE_WEBSOCKET",
});
