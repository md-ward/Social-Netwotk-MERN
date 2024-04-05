import { io } from "socket.io-client";
import { getCookie } from "../../useCookie";
import useNotificationStore from "../notifications/store/useNotificationStore";
const URL = import.meta.env.VITE_NOTIFICATION_SOCKET_URL;

class NotificationServiceClient {
  #audio;
  constructor() {
    this.#audio = new Audio("/assets/sounds/notification.mp3");

    const jwtToken = getCookie("jwt_user");
    this.socket = io(URL, {
      extraHeaders: { Authorization: jwtToken },
      path: "/notifications",
    });

    // Event handlers
    this.socket.on("connect", () => {
      console.log("Connected to notification server");
    });

    this.socket.on("notification", async (notification) => {
      console.warn("Received notification:", notification);
      await this.#audio.play();
      useNotificationStore
        .getState()
        .handleUpdateNewNotifications(notification);
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from notification server");
    });

    this.socket.on("connect_error", (error) => {
      console.log("Connection error:", error);
    });
  }
}
export default NotificationServiceClient;
