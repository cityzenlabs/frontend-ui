import SockJS from "sockjs-client";
import Stomp from "stompjs";

type MessageCallback = (message: any) => void;

class WebSocketService {
  private stompClient: Stomp.Client | null;
  private callback: MessageCallback;

  constructor() {
    this.stompClient = null;
    this.callback = () => {};
  }

  connect(endpoint: string) {
    const socket = new SockJS(endpoint);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, this.onConnect, this.onError);
  }

  private onConnect = (frame?: Stomp.Frame) => {
    // Subscribe to the topic here
    if (this.stompClient) {
      this.stompClient.subscribe(
        "/topic/notifications",
        this.onMessageReceived,
      );
    }
  };

  private onMessageReceived = (message: Stomp.Message) => {
    // Handle the received message
    if (this.callback) {
      this.callback(JSON.parse(message.body));
    }
  };

  private onError = (error: string | Stomp.Frame) => {
    if (typeof error === "string") {
      console.error("WebSocket connection error:", error);
    } else {
    }
  };

  setCallback(callback: MessageCallback) {
    this.callback = callback;
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log("Disconnected");
      });
    }
  }
}

export const webSocketService = new WebSocketService();
