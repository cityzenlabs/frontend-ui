const initialState = {
  messages: [],
  isConnected: false,
};

const webSocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "CONNECT_WEBSOCKET":
      return {
        ...state,
        isConnected: true,
      };
    case "DISCONNECT_WEBSOCKET":
      return {
        ...state,
        isConnected: false,
      };
    default:
      return state;
  }
};

export default webSocketReducer;
