export class WebSocketManager {
  private socket: WebSocket;
  public connected: boolean = false;
  private onMessageCallback: (data: any) => void;

  constructor(onMessageCallback: (data: any) => void) {
    this.socket = new WebSocket("ws://localhost:8080/ws?id=123");
    this.onMessageCallback = onMessageCallback;

    this.socket.onopen = () => {
      console.log("WebSocket connection established");
      this.connected = true;
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.onMessageCallback(data);
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  send(data: any) {
    this.socket.send(JSON.stringify(data));
  }
}
